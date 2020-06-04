import React from "react";
import {
  FILTER_TEXT_CHANGED,
  FILTER_TYPE_CHANGED,
  SET_DARK_MODE,
  TOGGLE_ARCHIVE_MODE,
  SET_ITEM_DIALOG_OPEN,
  LOGOUT,
} from "../../util/actionTypes.js";
import itemTypes from "../../util/itemTypes.js";

const ControlBar = ({
  archiveMode,
  darkMode,
  dispatch,
  filterText,
  filterType,
  handleFetchItems,
}) => {
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

  const handleArchiveMode = (event) => {
    dispatch({ type: TOGGLE_ARCHIVE_MODE });
    handleFetchItems(event.target.checked);
  };

  const handleCreateItem = () => {
    dispatch({ type: SET_ITEM_DIALOG_OPEN });
  };

  const handleLogout = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <div id="control-bar">
      <div id="refresh-items">
        <button onClick={() => handleFetchItems(archiveMode)}>↻</button>
      </div>
      <div id="type-filter">
        <button onClick={() => handleTypeFilter(itemTypes.all)}>
          {filterType === itemTypes.all ? "*" : null}All
        </button>
        <button onClick={() => handleTypeFilter(itemTypes.link)}>
          {filterType === itemTypes.link ? "*" : null}Links
        </button>
        <button onClick={() => handleTypeFilter(itemTypes.note)}>
          {filterType === itemTypes.note ? "*" : null}Notes
        </button>
        <button onClick={() => handleTypeFilter(itemTypes.diary)}>
          {filterType === itemTypes.diary ? "*" : null}Diary Entries
        </button>
      </div>
      <div id="item-filter">
        <input
          type="text"
          placeholder="Search"
          onChange={handleItemFilter}
          value={filterText || ""}
        ></input>
      </div>
      <div id="tools">
        <div id="dark-mode-toggle">
          <input type="checkbox" checked={darkMode} onChange={handleDarkMode} />
          <label>{darkMode ? "🌛" : "🌞"}</label>
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
