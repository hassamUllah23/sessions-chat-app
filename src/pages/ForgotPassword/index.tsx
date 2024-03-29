import { FormEvent, useState } from "react";
import { InputLabel } from "../../components";
import { useNavigate } from "react-router-dom";
import { AuthApiClient } from "../../apis/auth.api";
import { useAppDispatch } from "../../store/store";
import { setAlert } from "../../store/slices/general.slice";

type Props = {};

function ForgotPassword({}: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    AuthApiClient.forgotPassword({ email }).then((res) => {
      if (res) {
        dispatch(
          setAlert({
            open: true,
            severity: "success",
            message: "A new password has been sent to your email address",
          }),
        );
        navigate("/");
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
    <section className="bg-background">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-card border-border rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-text">
              Forgot Password
            </h1>
            <p className="text-sm font-light text-link">
              An email will be sent to your email address
            </p>
            <form onSubmit={handleSubmit}>
              <div>
                <InputLabel label="Email" />

                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-background border-border text-text sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white border-border mt-5 bg-primary border-2 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-800"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
