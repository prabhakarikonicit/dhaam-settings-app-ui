import ReactDOM from "react-dom/client";

import "./index.css";
import ConfigurationsComponent from "./localComponents/configurations/configurationscomponent";

const App = () => (
  // <div className="mt-10 text-3xl mx-auto max-w-6xl">
  //   <div>Name: dhaam-settings-app-ui</div>
  //   <div>Framework: react-19</div>
  // </div>
  <ConfigurationsComponent/>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);