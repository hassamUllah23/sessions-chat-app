import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { UsersApiClient } from "../../../apis/users.api";
import { User } from "../../../utils/types.utils";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { setAlert } from "../../../store/slices/general.slice";
import { AxiosResponse } from "axios";
import { UserName, SearchResults } from "../../../components";
import { isLoggedInUser } from "../../../utils/functions.utils";
import { ConversationsApiClient } from "../../../apis/conversations.api";
import { setConversations } from "../../../store/slices/conversation.slice";

type Props = {};

function SearchModal({}: Props) {
  const dispatch = useAppDispatch();
  const { loggedInUser } = useAppSelector((state) => state.user);

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
              searcherId: localStorage.getItem("userId") || "",
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
      setLoading(() => true);
      UsersApiClient.addToContacts({
        currentId: localStorage.getItem("userId") || "",
        id: data?._id || "",
      }).then((response) => {
        if (response) {
          ConversationsApiClient.list({
            userId: localStorage.getItem("userId") as string,
          }).then((data) => {
            dispatch(setConversations(data));
          });

          dispatch(
            setAlert({
              open: true,
              severity: "success",
              message: "User added to contacts",
            }),
          );
          setData((_prev) => undefined);
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
    } catch (error) {
      console.error({ error });
      setData((_prev) => undefined);
    } finally {
      setLoading(() => false);
    }
  };
  return (
    <div className="w-full">
      <div
        id="search-modal"
        className="hs-overlay bg-gray-500/30 dark:bg-gray-900/75 hidden size-full fixed top-0 start-0 !z-[100] overflow-x-hidden overflow-y-auto"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
          <div className="w-full max-h-full bg-card overflow-hidden flex flex-col border border-border shadow-sm rounded-xl">
            <div className="flex bg-card justify-between items-center py-3 px-4 border-b border-border ">
              <h3 className="font-bold text-text">Search people</h3>
              <button
                type="button"
                className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent  disabled:pointer-events-none"
                data-hs-overlay="#search-modal"
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
              <div className="bg-card">
                {/* input field with search bar */}
                <input
                  type="text"
                  name="key"
                  id="keyy"
                  className="mb-5 bg-background border border-border text-text sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="Search by username..."
                  onChange={(e) => setKey(e.target.value)}
                  value={key}
                  required
                />

                <SearchResults data={data} dirty={dirty} loading={loading}>
                  {data ? (
                    <div className="w-fit border-2 border-border text-text p-2 rounded-lg flex flex-row items-center gap-x-8">
                      <UserName user={data} />
                      {isLoggedInUser(data._id as string) ? (
                        <p className="text-link font-semibold text-sm">You</p>
                      ) : loggedInUser?.contacts?.includes(
                          data._id as string,
                        ) ? (
                        <p className="text-link font-semibold text-sm">
                          In Contacts
                        </p>
                      ) : (
                        <div className="flex flex-row items-center rounded-md hover:bg-gray-100 py-1 px-2 cursor-pointer">
                          <IoIosAdd className="text-blue-600" />
                          <p
                            className="text-blue-600 text-sm"
                            onClick={handleAddUser}
                          >
                            Add to Contacts
                          </p>
                        </div>
                      )}
                    </div>
                  ) : null}
                </SearchResults>
                {/* if user is found then show a pill with user name in it and a blue colored "+ Add" text button */}

                {/* show a loading animation while api is called */}

                {/* if not found then show a red colored "No user found" text */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { SearchModal };
