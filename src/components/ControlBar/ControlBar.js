import React from "react";
import {
  FETCH_ITEMS_COMPLETE,
  FILTER_TEXT_CHANGED,
  FILTER_TYPE_CHANGED,
  SET_DARK_MODE,
  TOGGLE_ARCHIVE_MODE,
  SET_ITEM_DIALOG_OPEN,
  LOGOUT,
  SET_IS_LOADING_ON,
} from "../../util/actionTypes.js";
import itemTypes from "../../util/itemTypes.js";
import { fetchItems } from "../../util/asyncActions.js";
import { useStore } from "../../util/Store.js";

const ControlBar = () => {
  const { state, dispatch } = useStore();

  const handleItemFilter = (event) => {
    dispatch({
      type: FILTER_TEXT_CHANGED,
      payload: event ? event.target.value : "",
    });
  };

  const handleTypeFilter = (type) => {
    dispatch({ type: FILTER_TYPE_CHANGED, payload: type });
  };

  const handleDarkMode = (event) => {
    dispatch({ type: SET_DARK_MODE, payload: event.target.checked });
  };

  const handleArchiveMode = async (event) => {
    dispatch({ type: TOGGLE_ARCHIVE_MODE });
    let items = await fetchItems(event.target.checked);
    dispatch({ type: FETCH_ITEMS_COMPLETE, payload: items });
  };

  const handleCreateItem = () => {
    dispatch({ type: SET_ITEM_DIALOG_OPEN });
  };

  const handleLogout = () => {
    dispatch({ type: LOGOUT });
  };

  const handleFetchItems = async () => {
    dispatch({ type: SET_IS_LOADING_ON });
    let items = await fetchItems(state.archiveMode);
    dispatch({ type: FETCH_ITEMS_COMPLETE, payload: items });
  };

  return (
    <div id="control-bar">
      <div id="refresh-items">
        <button onClick={handleFetchItems}>↻</button>
      </div>
      <div id="type-filter">
        <button onClick={() => handleTypeFilter(itemTypes.all)}>
          {state.filterType === itemTypes.all ? "*" : null}All
        </button>
        <button onClick={() => handleTypeFilter(itemTypes.link)}>
          {state.filterType === itemTypes.link ? "*" : null}Links
        </button>
        <button onClick={() => handleTypeFilter(itemTypes.note)}>
          {state.filterType === itemTypes.note ? "*" : null}Notes
        </button>
        <button onClick={() => handleTypeFilter(itemTypes.diary)}>
          {state.filterType === itemTypes.diary ? "*" : null}Diary Entries
        </button>
      </div>
      <div id="item-filter">
        <input
          type="text"
          placeholder="Search"
          onChange={handleItemFilter}
          value={state.filterText || ""}
        ></input>
      </div>
      <div id="tools">
        <div id="dark-mode-toggle">
          <input
            type="checkbox"
            checked={state.darkMode}
            onChange={handleDarkMode}
          />
          <label>{state.darkMode ? "🌛" : "🌞"}</label>
        </div>
        <div id="archive-mode-toggle">
          <input type="checkbox" onChange={handleArchiveMode} />
          <label>⌚</label>
        </div>
        <div id="create-item">
          <button onClick={handleCreateItem}>Create</button>
        </div>
        <div id="logout">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default ControlBar;
