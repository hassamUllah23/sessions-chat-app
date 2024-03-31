import { useEffect } from "react";
import "./App.css";
import { MyRouter } from "./router";
import "preline/preline";
import { IStaticMethods } from "preline/preline";
import { useLocation } from "react-router-dom";
import { getToken } from "firebase/messaging";
import { FirebaseService } from "./services/firebase.service";
import { User } from "./utils/types.utils";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

function App() {
  const location = useLocation();
  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);
  useEffect(() => {
    if (
      (JSON.parse(localStorage.getItem("user") as string) as User)?.settings
        ?.theme === "dark"
    ) {
      document.querySelector("body")?.classList.replace("light", "dark");
    } else {
      document.querySelector("body")?.classList.replace("dark", "light");
    }

    requestPermission();
  }, []);

  const requestPermission = async () => {
    console.log("requestPermission");
    const permission = await Notification.requestPermission();
    if (permission) {
      const token = await getToken(FirebaseService.messaging, {
        vapidKey:
          "BLEpOHcw1WzF9FKkzUYpG-UorFqEoZfYGC7dRRy5lWkHaFknWHSc-QGhGCDN71HHzQG1IcyLU5eDUof4iQPEJmM",
      });
      if (token) {
        localStorage.setItem("fcmToken", token);
      }
      console.log("Firebase Message Token: ", token);
    } else {
      console.log("Notifications permission denied");
    }
  };

  return (
    <div>
      <MyRouter />
    </div>
  );
}

export default App;
