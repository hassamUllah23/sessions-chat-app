import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { ThemeModeScript } from "flowbite-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeModeScript />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
