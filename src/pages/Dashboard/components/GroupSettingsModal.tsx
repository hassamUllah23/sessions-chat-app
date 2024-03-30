import { Checkbox, Select } from "flowbite-react";
import { SearchResults, UserName } from "../../../components";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  Conversation,
  Invite,
  Participant,
  Session,
  User,
} from "../../../utils/types.utils";
import { GroupRoles } from "../../../utils/constants.utils";
import { ChangeEvent, useEffect, useState } from "react";
import {
  getLoggedInUser,
  isGroupAdmin,
  isLoggedInUser,
} from "../../../utils/functions.utils";
import { ConversationsApiClient } from "../../../apis/conversations.api";
import { setAlert } from "../../../store/slices/general.slice";
import { setCurrentConversation } from "../../../store/slices/conversation.slice";
import {
  InviteStatusEnum,
  SessionStatusEnum,
} from "../../../utils/enums.utils";
import { InvitesApiClient } from "../../../apis/invites.api";
import { AxiosResponse } from "axios";
import { UsersApiClient } from "../../../apis/users.api";
import { IoIosAdd } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { SessionsApiClient } from "../../../apis/sessions.api";
import { setSessions } from "../../../store/slices/sessions.slice";

type Props = {};

function GroupSettingsModal({}: Props) {
  const dispatch = useAppDispatch();
  const { currentConversation } = useAppSelector((state) => state.conversation);
  const { sessions } = useAppSelector((state) => state.session);

  const [duplicateParticipants, setDuplicateParticipants] = useState<
    Array<Participant>
  >([]);

  const [sessionParticipants, setSessionParticipants] = useState<
    Array<Participant>
  >([]);

  const [invites, setInvites] = useState<Array<Invite>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<User | undefined>(undefined);
  const [dirty, setDirty] = useState<boolean>(false);
  const [key, setKey] = useState<string>("");
  const [duration, setDuration] = useState<number>(1800000);

  useEffect(() => {
    const getData = setTimeout(async () => {
      if (key.length > 0) {
        try {
          setLoading(() => true);
          const response: AxiosResponse | null =
            await UsersApiClient.getByUsername({
              username: key,
            });
          if (response?.status === 200) {
            const user: User = response.data;
            setData((_prev) => user);
          } else {
            setData((_prev) => undefined);
          }
        } catch (error) {
          console.error({ error });
          setData((_prev) => undefined);
        } finally {
          if (!dirty) setDirty((_prev) => true);
          setLoading(() => false);
        }
      }
    }, 2000);

    return () => clearTimeout(getData);
  }, [key]);

  const getInvites = async () => {
    const invites_ = await InvitesApiClient.listByConversation({
      conversationId: currentConversation?._id as string,
    });
    setInvites((_prev) => invites_);
  };

  useEffect(() => {
    if (currentConversation) {
      setDuplicateParticipants(
        (_prev) => currentConversation?.participants as Participant[],
      );
      getInvites();
    }
  }, [currentConversation]);

  const handleChange = (
    event: ChangeEvent<HTMLSelectElement>,
    index: number,
  ) => {
    setDuplicateParticipants((prev) => {
      let newParticipants = [...prev];
      newParticipants[index] = {
        user: newParticipants[index].user,
        role: event.target.value,
      };
      return newParticipants;
    });
  };
  const handleSaveChanges = () => {
    ConversationsApiClient.updateParticipants({
      conversationId: currentConversation?._id as string,
      participants: duplicateParticipants,
    })
      .then((res) => {
        if (res?.status === 200) {
          dispatch(
            setAlert({
              message: "Members updated successfully",
              severity: "success",
              open: true,
            }),
          );
          dispatch(
            setCurrentConversation({
              ...(currentConversation as Conversation),
              participants: duplicateParticipants,
            }),
          );
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch(
          setAlert({ message: err.message, severity: "error", open: true }),
        );
      });
  };

  const handleInvite = async () => {
    try {
      const response = await InvitesApiClient.createInvite({
        adminId: getLoggedInUser()._id as string,
        inviteeId: data?._id as string,
        conversationId: currentConversation?._id as string,
      });
      if (response?.status === 200) {
        dispatch(
          setAlert({
            open: true,
            severity: "success",
            message: "Invite sent succesfully",
          }),
        );
      } else {
        dispatch(
          setAlert({
            open: true,
            severity: "error",
            message: response?.data,
          }),
        );
      }
    } catch (error: any) {
      dispatch(
        setAlert({
          open: true,
          severity: "error",
          message: error.message,
        }),
      );
    } finally {
    }
  };

  const handleLeave = async () => {
    const response = await ConversationsApiClient.leaveGroup({
      userId: getLoggedInUser()._id as string,
      conversationId: currentConversation?._id as string,
    });
    if (response && response.status === 200) {
      dispatch(
        setAlert({
          open: true,
          severity: "success",
          message: "You have left this group",
        }),
      );
    } else {
      dispatch(
        setAlert({
          open: true,
          severity: "error",
          message: "Something went wrong",
        }),
      );
    }
  };

  const handleSelectSessionParticipant = ({
    event,
    participant,
  }: {
    event: ChangeEvent<HTMLInputElement>;
    participant: Participant;
  }) => {
    if (event.target.checked) {
      setSessionParticipants((prev) => [...prev, { ...participant }]);
    } else {
      setSessionParticipants((prev) => [
        ...[...prev].filter(
          (p) => (p.user as User)._id !== (participant.user as User)._id,
        ),
      ]);
    }
  };

  const handleStartSession = async () => {
    try {
      const response = await SessionsApiClient.startSession({
        adminId: localStorage.getItem("userId") as string,
        duration: duration,
        parentConversationId: currentConversation?._id as string,
        memberIds: sessionParticipants.map((p) => (p.user as User)._id),
      });
      if (response?.status === 200) {
        dispatch(
          setCurrentConversation({
            ...(currentConversation as Conversation),
            session: response.data as Session,
          }),
        );
        dispatch(setSessions([...sessions, response.data as Session]));
        dispatch(
          setAlert({
            message: "Session started",
            severity: "success",
            open: true,
          }),
        );
      } else {
        dispatch(
          setAlert({
            message: (response?.data as string) || "Failed to start session",
            severity: "error",
            open: true,
          }),
        );
      }
    } catch (error) {
      dispatch(
        setAlert({
          message: "Something went wrong",
          severity: "error",
          open: true,
        }),
      );
    }
  };

  const handleStopSession = async () => {
    try {
      const response = await SessionsApiClient.stop({
        adminId: localStorage.getItem("userId") as string,
        sessionId: currentConversation?.session as string,
      });
      if (response?.status === 200) {
        dispatch(
          setCurrentConversation({
            ...(currentConversation as Conversation),
            session: null,
          }),
        );
        dispatch(
          setAlert({
            message: "Session stopped",
            severity: "success",
            open: true,
          }),
        );
      } else {
        dispatch(
          setAlert({
            message: (response?.data as string) || "Failed to start session",
            severity: "error",
            open: true,
          }),
        );
      }
    } catch (error) {
      dispatch(
        setAlert({
          message: "Something went wrong",
          severity: "error",
          open: true,
        }),
      );
    }
  };

  const handleDurationChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDuration(() => parseInt(event.target.value));
  };

  return (
    <div>
      <div
        id="group-settings-modal"
        className="hs-overlay bg-gray-500/30 dark:bg-gray-900/75 hidden size-full fixed top-0 start-0 !z-[100] overflow-x-hidden overflow-y-auto"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
          <div className="w-full max-h-full bg-card overflow-hidden flex flex-col border border-border shadow-sm rounded-xl">
            <div className="flex bg-card justify-between items-center py-3 px-4 border-b border-border ">
              <h3 className="font-bold text-text">Settings</h3>
              <button
                type="button"
                className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent  disabled:pointer-events-none"
                data-hs-overlay="#group-settings-modal"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="flex-shrink-0 size-4 text-text"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <div className="p-5 overflow-y-auto">
              {/* MEMBERS */}

              {currentConversation ? (
                <>
                  {currentConversation.isSession ? null : (
                    <>
                      {/* INVITATIONS */}
                      {isGroupAdmin({
                        conversation: currentConversation as Conversation,
                      }) ? (
                        <div>
                          <div className="flex flex-col gap-1 my-4">
                            <p className="text-lg text-text">Invite People</p>
                            <div className="relative text-text">
                              <div className="absolute inset-y-0 start-0 flex items-center ps-3">
                                <svg
                                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                  />
                                </svg>
                              </div>
                              <input
                                type="search"
                                id="default-search"
                                className="block w-full p-2.5 ps-10 border rounded-lg text-text border-border bg-background"
                                placeholder="Invite people..."
                                onChange={(e) => {
                                  setKey(e.target.value);
                                  setData((_prev) => undefined);
                                  setDirty((_prev) => false);
                                }}
                                value={key}
                                required
                              />
                            </div>
                            <SearchResults
                              data={data}
                              dirty={dirty}
                              loading={loading}
                            >
                              {data ? (
                                <div className="w-fit border-2 border-border text-text p-2 rounded-lg flex flex-row items-center gap-x-8">
                                  <UserName user={data} />
                                  {isLoggedInUser(data._id as string) ? (
                                    <p className="text-link font-semibold text-sm">
                                      You
                                    </p>
                                  ) : currentConversation?.participants.find(
                                      (participant) =>
                                        participant.user === data._id,
                                    ) ? (
                                    <p className="text-link font-semibold text-sm">
                                      Already a member
                                    </p>
                                  ) : (
                                    <div className="flex flex-row items-center rounded-md hover:bg-gray-100 py-1 px-2 cursor-pointer">
                                      <IoIosAdd className="text-blue-600" />
                                      <p
                                        className="text-blue-600 text-sm"
                                        onClick={handleInvite}
                                      >
                                        Send Invite
                                      </p>
                                    </div>
                                  )}
                                </div>
                              ) : null}
                            </SearchResults>
                            <button
                              type="button"
                              className=" text-white bg-primary focus:ring-4 my-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                              onClick={handleSaveChanges}
                            >
                              Save Changes
                            </button>
                          </div>
                          <div className="flex flex-col gap-1 my-4">
                            <p className="text-lg text-text">Sent Invites</p>
                            {invites?.map((invite: Invite, index) => (
                              <div
                                key={index}
                                className="flex flex-row justify-between w-full"
                              >
                                <UserName
                                  key={index}
                                  user={invite.inviteeId as User}
                                />

                                <InviteStatus status={invite.status} />
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {isGroupAdmin({
                        conversation: currentConversation as Conversation,
                      }) ? (
                        <>
                          {currentConversation?.session !== null &&
                          currentConversation?.session !== undefined &&
                          (currentConversation.session as Session).status ===
                            SessionStatusEnum.ongoing ? (
                            <button
                              type="button"
                              className="mt-5 w-full text-error bg-transparent border-2 border-error font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                              onClick={handleStopSession}
                            >
                              <div className="flex flex-row items-center justify-center gap-2">
                                <p>Stop ongoing Session</p>
                                <IoIosLogOut className="text-error" size={20} />
                              </div>
                            </button>
                          ) : (
                            <div className="flex flex-col gap-1">
                              <p className="text-lg text-text mb-2">
                                Start a session
                              </p>
                              <div className="flex flex-row justify-between w-full">
                                <p className="text-text tex-lg">Duration</p>
                                <Select
                                  id=""
                                  defaultValue={1800000}
                                  onChange={handleDurationChange}
                                  className="bg-background"
                                  style={{
                                    backgroundColor: "",
                                    color: "black",
                                  }}
                                >
                                  <option
                                    value={1800000}
                                    className="capitalize text-text"
                                    selected
                                  >
                                    30 min
                                  </option>
                                  <option
                                    value={3600000}
                                    className="capitalize text-text"
                                  >
                                    1 hour
                                  </option>
                                  <option
                                    value={7200000}
                                    className="capitalize text-text"
                                  >
                                    2 hour
                                  </option>
                                </Select>
                              </div>
                              {duplicateParticipants?.map(
                                (participant: Participant, index) => (
                                  <div>
                                    {isLoggedInUser(
                                      (participant.user as User)._id,
                                    ) ? null : (
                                      <div
                                        key={index}
                                        className="flex flex-row justify-between w-full"
                                      >
                                        <UserName
                                          key={index}
                                          user={participant.user as User}
                                        />

                                        <Checkbox
                                          id="remember"
                                          onChange={(event) => {
                                            handleSelectSessionParticipant({
                                              event,
                                              participant,
                                            });
                                          }}
                                        />
                                      </div>
                                    )}
                                  </div>
                                ),
                              )}
                              <button
                                type="button"
                                className=" text-white bg-primary focus:ring-4 my-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                                onClick={handleStartSession}
                              >
                                Start Session
                              </button>
                            </div>
                          )}
                        </>
                      ) : null}

                      <button
                        type="button"
                        className="mt-5 w-full text-error bg-transparent border-2 border-error font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick={handleLeave}
                      >
                        <div className="flex flex-row items-center justify-center gap-2">
                          <p>Leave Group</p>
                          <IoIosLogOut className="text-error" size={20} />
                        </div>
                      </button>
                    </>
                  )}

                  <div className="flex flex-col gap-1">
                    <p className="text-lg text-text">Members</p>
                    {duplicateParticipants?.map(
                      (participant: Participant, index) => (
                        <div
                          key={index}
                          className="flex flex-row justify-between w-full"
                        >
                          <UserName
                            key={index}
                            user={participant.user as User}
                          />

                          {currentConversation.isSession ? (
                            <p
                              key={index}
                              className="capitalize text-link font-semibold my-1 text-center"
                              color="red"
                            >
                              {participant.role}
                            </p>
                          ) : (
                            <div>
                              {isGroupAdmin({
                                conversation:
                                  currentConversation as Conversation,
                              }) ? (
                                <Select
                                  id="countries"
                                  defaultValue={participant.role}
                                  onChange={(e) => handleChange(e, index)}
                                  disabled={isLoggedInUser(
                                    (participant.user as User)._id as string,
                                  )}
                                  className="bg-background"
                                  style={{ backgroundColor: "" }}
                                >
                                  {GroupRoles.map((role, index) => (
                                    <option
                                      key={index}
                                      value={role}
                                      className="capitalize text-text"
                                    >
                                      {role}
                                    </option>
                                  ))}
                                </Select>
                              ) : (
                                <p
                                  key={index}
                                  className="capitalize text-link font-semibold my-1 text-center"
                                  color="red"
                                >
                                  {participant.role}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      ),
                    )}
                    <button
                      type="button"
                      className=" text-white bg-primary focus:ring-4 my-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                      onClick={handleSaveChanges}
                    >
                      Save Changes
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InviteStatus({ status }: { status: InviteStatusEnum }) {
  const color =
    status === InviteStatusEnum.rejected
      ? "text-error bg-error/10"
      : status === InviteStatusEnum.accepted
        ? "text-success bg-success/10"
        : "text-link bg-link/10";
  return (
    <p className={`py-1 px-2.5 rounded-lg text-sm capitalize ${color}`}>
      {status}
    </p>
  );
}

export { GroupSettingsModal };
