import { useEffect } from "react";
import "./App.css";
import { MyRouter } from "./router";
import "preline/preline";
import { IStaticMethods } from "preline/preline";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

function App() {
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.querySelector("body")?.classList.replace("light", "dark");
    } else {
      document.querySelector("body")?.classList.replace("dark", "light");
    }
  }, []);

  return (
    <div>
      <MyRouter />
    </div>
  );
}

export default App;
