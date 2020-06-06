import React, { useEffect } from "react";
import { useStore } from "../util/Store.js";
import LoginForm from "./LoginForm";
import ItemDialog from "./ItemDialog.js";
import ControlBar from "./ControlBar/ControlBar.js";
import Items from "./Items";
import { SET_DARK_MODE, SET_THEME } from "../util/actionTypes.js";
import handleLinkPaste from "../util/clipboard.js";
import handleKeydown from "../util/keyboard.js";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./GlobalStyles.js";
import themes from "./ui/themes.js";

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

  useEffect(() => {
    dispatch({ type: SET_THEME, payload: state.darkMode ? "dark" : "light" });
  }, [state.darkMode]);

  if (!sessionStorage.getItem("token") && !state.token) {
    return (
      <ThemeProvider theme={themes[state.theme]}>
        <GlobalStyles />
        <LoginForm />
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={themes[state.theme]}>
        <GlobalStyles />
        <div
          onPaste={() => handleLinkPaste(event, dispatch)}
          onKeyDown={(event) =>
            handleKeydown(event, state.dialogOpen, dispatch)
          }
          style={{ opacity: state.isLoading ? 0.5 : 1 }}
        >
          {state.dialogOpen && <ItemDialog />}
          <ControlBar />
          <Items />
        </div>
      </ThemeProvider>
    );
  }
};

export default App;
