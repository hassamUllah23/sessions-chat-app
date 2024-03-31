import { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import { User } from "../utils/types.utils";
import { UsersApiClient } from "../apis/users.api";
type Props = {};

function DarkModeSwitch({}: Props) {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (
      (JSON.parse(localStorage.getItem("user") as string) as User)?.settings
        ?.theme === "dark"
    ) {
      setChecked(() => true);
      document.querySelector("body")?.classList.replace("light", "dark");
    } else {
      setChecked(() => false);
      document.querySelector("body")?.classList.replace("dark", "light");
    }
  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(() => event.target.checked);
    localStorage.setItem("theme", event.target.checked ? "dark" : "light");
    event.target.checked
      ? document.querySelector("body")?.classList.replace("light", "dark")
      : document.querySelector("body")?.classList.replace("dark", "light");
    UsersApiClient.toggleTheme({
      userId: localStorage.getItem("userId") as string,
      theme: event.target.checked ? "dark" : "light",
    });
  };

  return (
    <div>
      <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
    </div>
  );
}

export { DarkModeSwitch };
