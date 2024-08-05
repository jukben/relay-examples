import * as React from "react";
import { render } from "react-dom";
import "./style.css";

import App from "./components/App";
import GraphiQL from "./components/playground/GraphiQL";

function Routes() {
  if (window.location.pathname === "/playground") {
    return <GraphiQL />;
  }
  return <App />;
}

render(<Routes />, document.getElementById("app"));
