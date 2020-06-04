import React, { useEffect, useReducer } from "react";
import LoginForm from "./LoginForm";
import ItemDialog from "./ItemDialog.js";
import ControlBar from "./ControlBar/ControlBar.js";
import Items from "./Items";
import initialState from "../util/initialState.js";
import { fetchItems } from "../util/asyncActions.js";
import reducer from "../util/reducer.js";
import {
  FETCH_ITEMS_COMPLETE,
  SET_DARK_MODE,
  SET_IS_LOADING_OFF,
  SET_IS_LOADING_ON,
  SET_ITEM_DIALOG_CLOSED,
} from "../util/actionTypes.js";
import handleLinkPaste from "../util/clipboard";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleFetchItems = async (archived) => {
    try {
      dispatch({ type: SET_IS_LOADING_ON });
      let fetchedItems = await fetchItems(archived);
      dispatch({ type: FETCH_ITEMS_COMPLETE, payload: fetchedItems });
    } catch (error) {
      console.error(error);
    }
    dispatch({ type: SET_IS_LOADING_OFF });
  };

  const handleKeyboard = (event) => {
    if (state.dialogOpen) {
      if (event.key === "Escape" || event.key === "Esc") {
        dispatch({ type: SET_ITEM_DIALOG_CLOSED });
      }
    }
  };

  const handlePaste = (event) => {
    !state.dialogOpen &&
      handleLinkPaste(event, handleFetchItems, state.archiveMode, dispatch);
  };

  useEffect(() => {
    let currentDarkModeSetting = localStorage.getItem(
      "pocket-dimension:dark-mode"
    );
    if (currentDarkModeSetting) {
      dispatch({
        type: SET_DARK_MODE,
        payload: JSON.parse(currentDarkModeSetting),
      });
    } else {
      localStorage.setItem("pocket-dimension:dark-mode", initialState.darkMode);
    }
  }, []);

  if (!sessionStorage.getItem("token") && !state.token) {
    return <LoginForm dispatch={dispatch} isLoading={state.isLoading} />;
  } else {
    return (
      <div onPaste={handlePaste} onKeyDown={handleKeyboard}>
        {state.dialogOpen && (
          <ItemDialog
            dispatch={dispatch}
            handleFetchItems={handleFetchItems}
            item={state.item}
          />
        )}
        <ControlBar
          archiveMode={state.archiveMode}
          darkMode={state.darkMode}
          dispatch={dispatch}
          filterText={state.filterText}
          filterType={state.filterType}
          handleFetchItems={handleFetchItems}
        />
        <Items
          archiveMode={state.archiveMode}
          darkMode={state.darkMode}
          dispatch={dispatch}
          filterText={state.filterText}
          filterType={state.filterType}
          handleFetchItems={handleFetchItems}
          items={state.items}
        />
      </div>
    );
  }
};

export default App;
