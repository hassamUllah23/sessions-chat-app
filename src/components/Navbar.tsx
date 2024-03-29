import { LuLogOut } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import { useAppDispatch } from "../store/store";
import {
  setOpenProfileModal,
  setOpenSettingsModal,
} from "../store/slices/modal.slice";
import { useNavigate } from "react-router-dom";
import { setCurrentConversation } from "../store/slices/conversation.slice";
import { setLoggedInUser } from "../store/slices/user.slice";
type Props = {};

function Navbar({}: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
    localStorage.clear();
    dispatch(setCurrentConversation(null));
    dispatch(setLoggedInUser(undefined));
  };

  return (
    <nav className="bg-background border-border">
      <div className="flex flex-wrap items-center justify-between p-4 w-full px-10">
        <div className="flex flex-row gap-x-5 justify-start items-center">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="messenger.png" className="h-8" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-text">
              ChatApp
            </span>
          </div>
          <div className="">
            <ul>
              <li data-hs-overlay="#search-modal">
                <div className="relative pointer-events-none cursor-pointer">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
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
                    className="block w-full p-2 ps-10 text-sm border rounded-lg text-text border-border bg-background"
                    placeholder="Search people..."
                    required
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-border rounded-lg bg-background md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
            <ListItem
              handleClick={() => {
                dispatch(setOpenProfileModal(true));
              }}
              label="Profile"
              overlay="#profile-modal"
              icon={<LuUser className="text-text" />}
            />
            <ListItem
              handleClick={() => {
                dispatch(setOpenSettingsModal(true));
              }}
              label="Settings"
              icon={<IoSettingsOutline className="text-text" />}
              overlay="#settings-modal"
            />
            <ListItem
              handleClick={handleLogout}
              label="Logout"
              icon={<LuLogOut className="text-text" />}
            />
          </ul>
        </div>
      </div>
    </nav>
  );
}

const ListItem = ({
  label,
  icon,
  handleClick,
  overlay,
}: {
  label: string;
  icon: any;
  handleClick: any;
  overlay?: string;
}) => {
  return (
    <li
      className="flex flex-row w-fit gap-2 items-center bg-background"
      onClick={handleClick}
      data-hs-overlay={overlay}
    >
      {icon}
      <p
        className={
          "cursor-pointer block py-2 px-3 text-text rounded hover:bg-background/50 md:p-0 text-sm "
        }
      >
        {label}
      </p>
    </li>
  );
};
export { Navbar };
