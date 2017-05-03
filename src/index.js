if (["production", "integration"].indexOf(process.env.NODE_ENV) >= 0) {
  if (location.protocol != "https:") {
    location.href =
      "https:" +
      window.location.href.substring(window.location.protocol.length);
  }
}

import React from "react";
import ReactDOM from "react-dom";

import App from "./main/App";

import "../node_modules/muicss/dist/css/mui.min.css";

import "./index.css";

ReactDOM.render(<App />, document.getElementById("root"));
