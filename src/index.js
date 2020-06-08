import React from "react";
import ReactDOM from "react-dom";
import { StoreProvider } from "./util/Store.js";
import App from "./components/App";

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById("root")
);
