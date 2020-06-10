import React from "react";
import ReactDOM from "react-dom";
import { StoreProvider } from "./util/Store.js";
import App from "./components/App";

const MemoizedApp = React.memo(App);

ReactDOM.render(
  <StoreProvider>
    <MemoizedApp />
  </StoreProvider>,
  document.getElementById("root")
);
