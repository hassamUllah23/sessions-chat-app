import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch } from "../../../store/store";
import { InputLabel } from "../../../components";
import { ChangePassword } from "./ChangePassword";
import { UsersApiClient } from "../../../apis/users.api";
import { setAlert } from "../../../store/slices/general.slice";

type Props = {};

function ProfileModal({}: Props) {
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ name, username, email });
    UsersApiClient.udpate({
      userId: localStorage.getItem("userId") as string,
      name,
      username,
      email,
    })
      .then((response) => {
        console.log(response);
        dispatch(
          setAlert({
            message: "Profile updated",
            open: true,
            severity: "success",
          }),
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          setAlert({
            message: "Something went wrong",
            open: true,
            severity: "error",
          }),
        );
      });
    // navigate("/");
  };

  useEffect(() => {
    UsersApiClient.getOne({
      userId: localStorage.getItem("userId") as string,
    }).then((response) => {
      setName(response.name);
      setEmail(response.email);
      setUsername(response.username);
    });
  }, []);

  return (
    <div className="h-min">
      <div
        id="profile-modal"
        className="hs-overlay bg-gray-500/30 dark:bg-gray-900/75 hidden size-full fixed top-0 start-0 !z-[100] overflow-x-hidden overflow-y-auto"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
          <div className="w-full max-h-full overflow-hidden bg-card flex flex-col border border-border shadow-sm rounded-xl">
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
                <div>
                  <ChangePassword />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Modal
        title="Profile"
        open={openProfileModal}
        onClose={() => dispatch(setOpenProfileModal(false))}
      >
        <div className="space-y-6">
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
              className=" text-white bg-primary border focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Save Changes
            </button>
          </form>
          <div>
            <ChangePassword />
          </div>
        </div>
      </Modal> */}
    </div>
  );
}

export { ProfileModal };
