import React, { useEffect } from "react";
import { useStore } from "../util/Store.js";
import LoginForm from "./LoginForm/LoginForm";
import ItemDialog from "./ItemDialog.js";
import ControlBar from "./ControlBar/ControlBar.js";
import Items from "./Items/Items.js";
import { SET_DARK_MODE, SET_THEME } from "../util/actionTypes.js";
import handleLinkPaste from "../util/clipboard.js";
import handleKeydown from "../util/keyboard.js";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./GlobalStyles.js";
import themes from "./ui/themes.js";
import Stack from "./ui/layout/Stack.js";
import initialState from "../util/initialState.js";
import EventHandler from "./EventHandler.js";

const App = () => {
  const { state, dispatch } = useStore();

  const onPaste = () => handleLinkPaste(event, state.dialogOpen, dispatch);
  const onKeyDown = (event) => handleKeydown(event, state.dialogOpen, dispatch);

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
        <EventHandler onKeyDown={onKeyDown} onPaste={onPaste}>
          <LoginForm />
        </EventHandler>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={themes[state.theme]}>
        <GlobalStyles />
        <EventHandler onKeyDown={onKeyDown} onPaste={onPaste}>
          <Stack space="small">
            {state.dialogOpen && <ItemDialog />}
            <ControlBar />
            <Items />
          </Stack>
        </EventHandler>
      </ThemeProvider>
    );
  }
};

export default App;
