import { FormEvent, useEffect, useState } from "react";
import { User } from "../../../utils/types.utils";
import { InputLabel, UserName, SearchResults } from "../../../components";
import { UsersApiClient } from "../../../apis/users.api";
import { RxCross2 } from "react-icons/rx";
import { ConversationsApiClient } from "../../../apis/conversations.api";
import { useAppDispatch } from "../../../store/store";
import { setAlert } from "../../../store/slices/general.slice";
import { setConversations } from "../../../store/slices/conversation.slice";
import { AxiosResponse } from "axios";

type Props = {};

function CreateGroupModal({}: Props) {
  const dispatch = useAppDispatch();
  const [groupName, setGroupName] = useState<string>("");
  const [selectedMembers, setSelectedMembers] = useState<Array<User>>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<User | undefined>(undefined);
  const [dirty, setDirty] = useState<boolean>(false);
  const [key, setKey] = useState<string>("");

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

  const handleAddUser = () => {
    try {
      if (data) {
        if (selectedMembers.find((u) => u._id === data._id) === undefined) {
          setSelectedMembers((prev) => [...prev, data]);
        }
      }
    } catch (error) {
      console.error({ error });
      setData((_prev) => undefined);
    }
  };

  const handleRemoveUser = (user: User) => {
    setSelectedMembers((prev) => prev.filter((u) => u._id !== user._id));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    ConversationsApiClient.createGroupConversation({
      adminId: localStorage.getItem("userId") || "",
      name: groupName,
      memberIds: selectedMembers.map((m) => m._id as string),
    })
      .then((response) => {
        if (!response) {
          dispatch(
            setAlert({
              message: "Something went wrong",
              open: true,
              severity: "error",
            }),
          );
        } else {
          dispatch(
            setAlert({
              message: "Group created succesfully",
              open: true,
              severity: "success",
            }),
          );
          ConversationsApiClient.list({
            userId: localStorage.getItem("userId") as string,
          }).then((data) => {
            dispatch(setConversations(data));
          });
        }
      })
      .catch((_error) => {
        dispatch(
          setAlert({
            message: "Something went wrong",
            open: true,
            severity: "error",
          }),
        );
      });
  };

  return (
    <div>
      <div
        id="create-group-modal"
        className="hs-overlay bg-gray-500/30 dark:bg-gray-900/75 hidden size-full fixed top-0 start-0 !z-[100] overflow-x-hidden overflow-y-auto"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
          <div className="w-full max-h-full bg-card overflow-hidden flex flex-col border border-border shadow-sm rounded-xl">
            <div className="flex bg-card justify-between items-center py-3 px-4 border-b border-border ">
              <h3 className="font-bold text-text">Settings</h3>
              <button
                type="button"
                className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent  disabled:pointer-events-none"
                data-hs-overlay="#create-group-modal"
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
            <div className="p-5">
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <InputLabel label="Group Name" />

                  <input
                    type="text"
                    name="groupname"
                    id="groupname"
                    className="bg-background border border-border text-text sm:text-sm rounded-lg block w-full p-2.5"
                    placeholder="Enter group name"
                    onChange={(e) => setGroupName(e.target.value)}
                    value={groupName}
                    required
                  />
                </div>
                <div>
                  <InputLabel label="Add Participants" />

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
                      placeholder="Search people..."
                      onChange={(e) => {
                        setKey(e.target.value);
                        setData((_prev) => undefined);
                        setDirty((_prev) => false);
                      }}
                      value={key}
                      required
                    />
                  </div>
                </div>

                <div>
                  <SearchResults data={data} dirty={dirty} loading={loading}>
                    {data ? (
                      <div
                        onClick={handleAddUser}
                        className="w-fit border-2 border-border text-text p-2 rounded-lg flex flex-row items-center gap-x-8 cursor-po"
                      >
                        <UserName user={data} />
                      </div>
                    ) : null}
                  </SearchResults>
                </div>
                <div className="flex flex-row items-center justify-start gap-2 flex-wrap">
                  {selectedMembers.map((member, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        handleRemoveUser(member);
                      }}
                      className="flex flex-row gap-x-2 items-center justify-between w-fit border border-border rounded-lg py-1.5 px-2.5 bg-primary/15 cursor-pointer hover:bg-error/20 hover:text-error"
                    >
                      <UserName user={member} />
                      <RxCross2 className="text-text" />
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white border border-transparent hover:border-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { CreateGroupModal };
