import { FormEvent, useState } from "react";
import { InputLabel } from "../../../components";
import { AuthApiClient } from "../../../apis/auth.api";
import { useAppDispatch } from "../../../store/store";
import { setAlert } from "../../../store/slices/general.slice";

type Props = {};

function ChangePassword({}: Props) {
  const dispatch = useAppDispatch();
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ oldPassword, newPassword, confirmPassword });
    AuthApiClient.changePassword({
      userId: localStorage.getItem("userId") as string,
      oldPassword: oldPassword,
      newPassword: newPassword,
    }).then((response) => {
      if (response.error) {
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
            message: "Password changed",
            open: true,
            severity: "success",
          }),
        );
      }
    });
  };

  return (
    <div className="bg-card">
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        <div>
          <InputLabel label="Old Password" />
          <input
            type="password"
            name="oldpassword"
            id="oldpassword"
            className="bg-background border border-border text-text sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            onChange={(e) => setOldPassword(e.target.value)}
            value={oldPassword}
            placeholder="Enter old password"
            required
          />
        </div>
        <div className="flex flex-row w-full gap-5">
          <div className="w-full">
            <InputLabel label="New Password" />
            <input
              type="password"
              name="newpassword"
              id="newpassword"
              placeholder="Enter new password"
              className="bg-background border-border text-text sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              required
            />
          </div>
          <div className="w-full">
            <InputLabel label="Confirm Password" />
            <input
              type="password"
              name="cpassword"
              id="cpassword"
              className="bg-background border-border text-text sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              placeholder="Confirm password"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-primary text-white  border- focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}

export { ChangePassword };
