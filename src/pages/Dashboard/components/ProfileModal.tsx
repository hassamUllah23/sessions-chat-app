import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { InputLabel, UserName } from "../../../components";
import { ChangePassword } from "./ChangePassword";
import { UsersApiClient } from "../../../apis/users.api";
import { setAlert } from "../../../store/slices/general.slice";
import { Conversation, Invite, User } from "../../../utils/types.utils";
import { AcceptParams, InvitesApiClient } from "../../../apis/invites.api";
import { ConversationsApiClient } from "../../../apis/conversations.api";
import { setConversations } from "../../../store/slices/conversation.slice";

type Props = {};

function ProfileModal({}: Props) {
  const dispatch = useAppDispatch();
  const { currentConversation } = useAppSelector((state) => state.conversation);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [contacts, setContacts] = useState<Array<string | User>>([]);
  const [invites, setInvites] = useState<Array<Invite>>([]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    UsersApiClient.udpate({
      userId: localStorage.getItem("userId") as string,
      name,
      username,
      email,
    })
      .then((_response) => {
        dispatch(
          setAlert({
            message: "Profile updated",
            open: true,
            severity: "success",
          }),
        );
      })
      .catch((error) => {
        console.error(error);
        dispatch(
          setAlert({
            message: "Something went wrong",
            open: true,
            severity: "error",
          }),
        );
      });
  };

  useEffect(() => {
    UsersApiClient.getOne({
      userId: localStorage.getItem("userId") as string,
    }).then((response) => {
      setName(response?.name || "");
      setEmail(response?.email || "");
      setUsername(response?.username || "");
      setContacts(response?.contacts || []);
    });

    InvitesApiClient.listPendingUserInvites({
      userId: localStorage.getItem("userId") as string,
    }).then((response) => {
      setInvites(() => response || []);
    });
  }, [currentConversation]);

  const handleAccept = (params: AcceptParams) => {
    InvitesApiClient.accept(params)
      .then((_response) => {
        ConversationsApiClient.list({
          userId: localStorage.getItem("userId") as string,
        }).then((data) => {
          dispatch(setConversations(data));
        });
        dispatch(
          setAlert({
            message: "Invite accepted",
            open: true,
            severity: "success",
          }),
        );
      })
      .catch((error) => {
        console.error(error);
        dispatch(
          setAlert({
            message: "Something went wrong",
            open: true,
            severity: "error",
          }),
        );
      });
  };

  const handleRemove = (contactId: string) => {
    UsersApiClient.removeContact({
      currentId: localStorage.getItem("userId") || "",
      id: contactId || "",
    }).then((response) => {
      if (response) {
        ConversationsApiClient.list({
          userId: localStorage.getItem("userId") as string,
        }).then((data) => {
          dispatch(setConversations(data));
        });

        setContacts((prev) => {
          let newArray = [...prev];
          newArray = newArray.filter((c) => (c as User)._id !== contactId);
          return [...newArray];
        });
        dispatch(
          setAlert({
            open: true,
            severity: "success",
            message: "User removed from contacts",
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
    });
  };

  return (
    <div className="h-min">
      <div
        id="profile-modal"
        className="hs-overlay bg-gray-500/30 dark:bg-gray-900/75 hidden size-full fixed top-0 start-0 !z-[100] overflow-x-hidden overflow-y-auto"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
          <div className="w-full max-h-full overflow-hidden bg-card overflow-y-auto flex flex-col border border-border shadow-sm rounded-xl">
            <div className="flex justify-between items-center py-3 px-4 border-b ">
              <h3 className="font-bold text-text">Profile</h3>
              <button
                type="button"
                className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent  disabled:pointer-events-none"
                data-hs-overlay="#profile-modal"
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
            <div className="p-4 overflow-y-auto">
              <div className="space-y-6">
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <InputLabel label="Name" />
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-background border border-border text-text sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="Enter name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      required
                    />
                  </div>
                  <div>
                    <InputLabel label="Username" />

                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="bg-background border border-border text-text sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="Enter username"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                      required
                    />
                  </div>
                  <div>
                    <InputLabel label="Email" />

                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-background border border-border text-text sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Enter email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className=" text-white bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    Save Changes
                  </button>
                </form>
                <div className="hs-accordion-group">
                  <div
                    className="hs-accordion"
                    id="hs-change-password-accordion"
                  >
                    <button
                      className="hs-accordion-toggle py-3 inline-flex items-center justify-between gap-x-3 w-full text-start text-text text-lg rounded-lg disabled:opacity-50 disabled:pointer-events-none d"
                      aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
                    >
                      Change Password
                      <svg
                        className="hs-accordion-active:hidden block size-4 text-text"
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
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                      <svg
                        className="hs-accordion-active:block hidden size-4"
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
                        <path d="m18 15-6-6-6 6" />
                      </svg>
                    </button>
                    <div
                      id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                      className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                      aria-labelledby="hs-change-password-accordion"
                    >
                      <div>
                        <ChangePassword />
                      </div>
                    </div>
                  </div>

                  <div className="hs-accordion" id="hs-contacts-accordion">
                    <button
                      className="hs-accordion-toggle py-3 inline-flex items-center justify-between gap-x-3 w-full text-start text-text text-lg rounded-lg disabled:opacity-50 disabled:pointer-events-none d"
                      aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
                    >
                      Contacts
                      <svg
                        className="hs-accordion-active:hidden block size-4 text-text"
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
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                      <svg
                        className="hs-accordion-active:block hidden size-4"
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
                        <path d="m18 15-6-6-6 6" />
                      </svg>
                    </button>
                    <div
                      id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                      className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                      aria-labelledby="hs-contacts-accordion"
                    >
                      {contacts.map((contact: string | User, index) => {
                        return (
                          <div
                            key={index}
                            className="flex flex-row justify-between w-full mb-2"
                          >
                            <UserName user={contact as User} />
                            <div className="flex flex-row gap-3">
                              {/* <p
                                onClick={() => {
                                  // handleAccept({
                                  //   inviteId: invite._id,
                                  //   inviteeId: invite.inviteeId as string,
                                  // });
                                }}
                                className={`cursor-pointer border border-border py-1 px-2.5 rounded-md hover:brightness-90 text-sm capitalize text-primary bg-primary/10`}
                              >
                                Say Hello!
                              </p> */}
                              <p
                                onClick={() => {
                                  handleRemove((contact as User)._id);
                                }}
                                className={`cursor-pointer border border-border py-1 px-2.5 rounded-md hover:brightness-90 text-sm capitalize text-error bg-error/10`}
                              >
                                Remove
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="hs-accordion" id="hs-invites-accordion">
                    <button
                      className="hs-accordion-toggle py-3 inline-flex items-center justify-between gap-x-3 w-full text-start text-text text-lg rounded-lg disabled:opacity-50 disabled:pointer-events-none d"
                      aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
                    >
                      Invites
                      <svg
                        className="hs-accordion-active:hidden block size-4 text-text"
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
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                      <svg
                        className="hs-accordion-active:block hidden size-4"
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
                        <path d="m18 15-6-6-6 6" />
                      </svg>
                    </button>
                    <div
                      id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                      className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                      aria-labelledby="hs-invites-accordion"
                    >
                      {invites.map((invite: Invite, index) => {
                        return (
                          <div className="flex flex-col gap-3">
                            <div className="flex flex-row flex-wrap">
                              <UserName
                                key={index}
                                user={invite.adminId as User}
                              />
                              <p className="text-text text-sm">
                                {` has invited you to join `}
                                <b>
                                  {(invite.conversationId as Conversation).name}
                                </b>
                              </p>
                            </div>
                            <div className="flex flex-row gap-3">
                              <p
                                onClick={() => {
                                  handleAccept({
                                    inviteId: invite._id,
                                    inviteeId: invite.inviteeId as string,
                                  });
                                }}
                                className={`cursor-pointer border border-border py-1 px-2.5 rounded-md hover:brightness-90 text-sm capitalize text-success bg-success/10`}
                              >
                                Accept
                              </p>
                              <p
                                className={`cursor-pointer border border-border py-1 px-2.5 rounded-md hover:brightness-90 text-sm capitalize text-error bg-error/10`}
                              >
                                Reject
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProfileModal };
