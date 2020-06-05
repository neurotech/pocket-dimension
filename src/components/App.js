import React, { useEffect, useReducer } from "react";
import { useStore } from "../util/Store.js";
import LoginForm from "./LoginForm";
import ItemDialog from "./ItemDialog.js";
import ControlBar from "./ControlBar/ControlBar.js";
import Items from "./Items";
import { fetchItems } from "../util/asyncActions.js";
import { SET_DARK_MODE } from "../util/actionTypes.js";
import handleLinkPaste from "../util/clipboard.js";
import handleKeydown from "../util/keyboard.js";

const App = () => {
  const { state, dispatch } = useStore();

  useEffect(() => {
    let currentSetting = localStorage.getItem("pocket-dimension:dark-mode");

    dispatch({
      type: SET_DARK_MODE,
      payload: currentSetting
        ? JSON.parse(currentSetting)
        : initialState.darkMode,
    });
  }, []);

  if (!sessionStorage.getItem("token") && !state.token) {
    return <LoginForm />;
  } else {
    return (
      <div
        onPaste={() => handleLinkPaste(event, dispatch)}
        onKeyDown={(event) => handleKeydown(event, state.dialogOpen, dispatch)}
        style={{ opacity: state.isLoading ? 0.5 : 1 }}
      >
        {state.dialogOpen && <ItemDialog />}
        <ControlBar />
        <Items />
      </div>
    );
  }
};

export default App;
