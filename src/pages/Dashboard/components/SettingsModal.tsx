import { DarkModeSwitch, UserName, SearchResults } from "../../../components";
import Switch from "@mui/material/Switch";
import { User } from "../../../utils/types.utils";
import { useEffect, useState } from "react";
import { UsersApiClient } from "../../../apis/users.api";
import { isLoggedInUser } from "../../../utils/functions.utils";
import { AxiosResponse } from "axios";
import { MdBlockFlipped } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { setAlert } from "../../../store/slices/general.slice";

type Props = {};

function SettingsModal({}: Props) {
  const dispatch = useAppDispatch();
  const { loggedInUser } = useAppSelector((state) => state.user);
  const [blockList, setBlockList] = useState<Array<string | User>>([]);

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

  useEffect(() => {
    UsersApiClient.getOne({
      userId: localStorage.getItem("userId") as string,
    }).then((response) => {
      setBlockList(response?.blockList || []);
    });
  }, []);

  const handleBlock = async () => {
    try {
      const response: AxiosResponse | null =
        await UsersApiClient.addToBlocklist({
          currentId: localStorage.getItem("userId") || "",
          id: data?._id || "",
        });
      if (response?.status === 200) {
        setBlockList((_prev) => [..._prev, data as User]);
        dispatch(
          setAlert({
            severity: "success",
            open: true,
            message: "User has been blocked",
          }),
        );
      } else {
        dispatch(
          setAlert({
            severity: "error",
            open: true,
            message: response?.data as string,
          }),
        );
      }
    } catch (error) {
      dispatch(
        setAlert({
          severity: "error",
          open: true,
          message: "Something went wrong",
        }),
      );
    } finally {
      setData((_prev) => undefined);
      setKey((_prev) => "");
      setDirty(false);
    }
  };
  const handleUnblock = async (user: User) => {
    try {
      const response: AxiosResponse | null = await UsersApiClient.unblock({
        currentId: localStorage.getItem("userId") || "",
        id: user._id || "",
      });
      if (response?.status === 200) {
        setBlockList((prev) => {
          let newBlockList = [...prev];
          newBlockList = newBlockList.filter(
            (element: User | string) => (element as User)._id !== user?._id,
          );
          return [...newBlockList];
        });
        dispatch(
          setAlert({
            severity: "success",
            open: true,
            message: "User unblocked successfully",
          }),
        );
      } else {
        dispatch(
          setAlert({
            severity: "error",
            open: true,
            message: response?.data as string,
          }),
        );
      }
    } catch (error) {
      dispatch(
        setAlert({
          severity: "error",
          open: true,
          message: "Something went wrong",
        }),
      );
    } finally {
      setData((_prev) => undefined);
      setKey((_prev) => "");
      setDirty(false);
    }
  };

  return (
    <div className="w-full">
      <div
        id="settings-modal"
        className="hs-overlay bg-gray-500/30 dark:bg-gray-900/75 hidden size-full fixed top-0 start-0 !z-[100] overflow-x-hidden overflow-y-auto"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
          <div className="w-full max-h-full bg-card overflow-hidden flex flex-col border border-border shadow-sm rounded-xl">
            <div className="flex bg-card justify-between items-center py-3 px-4 border-b border-border ">
              <h3 className="font-bold text-text">Settings</h3>
              <button
                type="button"
                className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent  disabled:pointer-events-none"
                data-hs-overlay="#settings-modal"
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
              <div className="bg-card flex flex-row items-center justify-between py-2.5">
                <p className="text-text text-lg">Dark mode</p>
                <DarkModeSwitch />
              </div>
              <div className="bg-card flex flex-row items-center justify-between py-2.5">
                <p className="text-text text-lg">Notifications</p>
                <Switch />
              </div>

              <div className="bg-card py-2.5">
                <p className="text-text text-lg mb-2">Block Users</p>
                <div className="hs-accordion-group">
                  <div className="">
                    <div className="bg-card">
                      {/* input field with search bar */}
                      <input
                        type="text"
                        name="key"
                        id="key"
                        className="mb-5 bg-background border border-border text-text sm:text-sm rounded-lg block w-full p-2.5"
                        placeholder="Search by username..."
                        onChange={(e) => setKey(e.target.value)}
                        value={key}
                        required
                      />

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
                            ) : loggedInUser?.contacts?.includes(
                                data._id as string,
                              ) ? (
                              <p className="text-link font-semibold text-sm">
                                In Contacts
                              </p>
                            ) : (
                              <div className="flex flex-row items-center gap-x-2 rounded-md bg-gray-100 py-1 px-2 cursor-pointer">
                                <MdBlockFlipped
                                  className="text-error"
                                  size={12}
                                />
                                <p
                                  className="text-error text-sm"
                                  onClick={handleBlock}
                                >
                                  Block
                                </p>
                              </div>
                            )}
                          </div>
                        ) : null}
                      </SearchResults>
                    </div>
                  </div>
                  <div className="hs-accordion" id="hs-blocklist-accordion">
                    <button
                      className="hs-accordion-toggle py-3 inline-flex items-center justify-between gap-x-3 w-full text-start text-text text-lg rounded-lg disabled:opacity-50 disabled:pointer-events-none d"
                      aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
                    >
                      Block List
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
                      aria-labelledby="hs-blocklist-accordion"
                    >
                      {blockList.map((element: string | User, index) => {
                        return (
                          <div
                            key={index}
                            className="flex flex-row justify-between items-center w-full my-1"
                          >
                            <UserName key={index} user={element as User} />
                            <p
                              onClick={() => {
                                handleUnblock(element as User);
                              }}
                              className={`cursor-pointer border border-border py-1 px-2.5 rounded-md hover:brightness-90 text-sm capitalize text-success bg-success/10`}
                            >
                              Unblock
                            </p>
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

export { SettingsModal };
