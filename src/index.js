import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./css/index.css";

ReactDOM.render(<App />, document.getElementById("root"));

window.addEventListener("load", function () {
  if (typeof history.pushState === "function") {
    history.pushState("!", null, null);
    window.onpopstate = function () {
      history.pushState("?", null, null);
      // Set edit post to "closed" somehow?
    };
  }
});
