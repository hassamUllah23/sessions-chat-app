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
  return (
    <div>
      <MyRouter />
    </div>
  );
}

export default App;
