import { FormEvent, useState } from "react";
import { InputLabel } from "../../components";
import { useNavigate } from "react-router-dom";
import { AuthApiClient } from "../../apis/auth.api";
import { useAppDispatch } from "../../store/store";
import { setAlert } from "../../store/slices/general.slice";

type Props = {};

const Register = ({}: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ name, username, email, password });
    AuthApiClient.register({ email, name, password, username }).then(
      (response) => {
        if (response?.error) {
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
              message: "Registration succesful",
              open: true,
              severity: "success",
            }),
          );
          navigate("/");
        }
      },
    );
  };
  return (
    <section className="bg-background">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-card">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-text">
              Create account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <InputLabel label="Name" />
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-background border border-border text-text sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:primary"
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
                  className="bg-background border border-border text-text sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  className="bg-background border border-border text-text sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
              <div>
                <InputLabel label="Password" />

                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-background border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Enter password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white border-2 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign up
              </button>
              <p className="text-sm font-light text-link">
                Already have an account?{" "}
                <a
                  href="/"
                  className="font-medium text-primary-600 hover:underline "
                >
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
