import { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
type Props = {};

function DarkModeSwitch({}: Props) {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setChecked(true);
      document.querySelector("body")?.classList.replace("light", "dark");
    } else {
      setChecked(false);
      document.querySelector("body")?.classList.replace("dark", "light");
    }
  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    localStorage.setItem("theme", event.target.checked ? "dark" : "light");
    event.target.checked
      ? document.querySelector("body")?.classList.replace("light", "dark")
      : document.querySelector("body")?.classList.replace("dark", "light");
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
