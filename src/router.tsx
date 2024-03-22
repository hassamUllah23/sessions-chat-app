import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { CustomAlert } from "./components/Alert";
import { useAppSelector } from "./store/store";
import { AlertState } from "./utils/types.utils";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";

export const MyRouter = () => {
  const alert: AlertState = useAppSelector((state) => state.general.alert);

  return (
    <div style={{ height: "100vh" }} className="bg background">
      {alert.open && (
        <CustomAlert
          alertProps={{
            severity: alert.severity,
            message: alert.message,
            open: alert.open,
          }}
        />
      )}

      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
};
