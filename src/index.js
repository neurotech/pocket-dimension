import React from "react";
import ReactDOM from "react-dom";
import { StoreProvider } from "./util/Store.js";
import App from "./components/App";
import "./css/index.css";

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById("root")
);

window.addEventListener("load", function () {
  if (typeof history.pushState === "function") {
    history.pushState("!", null, null);
    window.onpopstate = function () {
      history.pushState("?", null, null);
      // Set edit post to "closed" somehow?
    };
  }
});
