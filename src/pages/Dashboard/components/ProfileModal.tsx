import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { setOpenProfileModal } from "../../../store/slices/modal.slice";
import { InputLabel, Modal } from "../../../components";
import { ChangePassword } from "./ChangePassword";
import { UsersApiClient } from "../../../apis/users.api";
import { setAlert } from "../../../store/slices/general.slice";

type Props = {};

function ProfileModal({}: Props) {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { openProfileModal } = useAppSelector((state) => state.modal);

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
      <Modal
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
      </Modal>
    </div>
  );
}

export { ProfileModal };
