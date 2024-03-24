import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputLabel } from "../../components";
import { AuthApiClient } from "../../apis/auth.api";
import { setAlert } from "../../store/slices/general.slice";
import { useAppDispatch } from "../../store/store";
type Props = {};

const Login = ({}: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ username, password });
    AuthApiClient.login({ password, username }).then((response) => {
      console.log({ response });
      if (response?.error) {
        dispatch(
          setAlert({
            message: "Incorrect username or password",
            open: true,
            severity: "error",
          }),
        );
      } else {
        navigate("/dashboard");
      }
    });
  };

  return (
    <section className="bg-background">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-card border-border">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-text">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <InputLabel label="Username" />

                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-background border border-border text-text sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="Enter username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  required
                />
              </div>
              <div>
                <InputLabel label="Password" />
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-background border border-border text-text sm:text-sm rounded-lg  focus:border-primary-600 block w-full p-2.5"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  value={password}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <a
                  href="/forgot"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 text-link"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white border border-transparent hover:border-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-link text-gray-400 ">
                Don’t have an account yet?{" "}
                <a href="/register" className="font-medium hover:underline">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
