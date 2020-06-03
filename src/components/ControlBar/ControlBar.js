import React from "react";

const ControlBar = ({
  archiveMode,
  darkMode,
  filterText,
  filterType,
  handleFetchItems,
  handleItemFilter,
  handleTypeFilter,
  handleDarkMode,
  handleArchiveMode,
  handleCreateItem,
  handleLogout,
}) => {
  return (
    <div id="control-bar">
      <div id="refresh-items">
        <button onClick={() => handleFetchItems(archiveMode)}>↻</button>
      </div>
      <div id="type-filter">
        <button onClick={() => handleTypeFilter("all")}>
          {filterType === "all" ? "*" : null}All
        </button>
        <button onClick={() => handleTypeFilter("link")}>
          {filterType === "link" ? "*" : null}Links
        </button>
        <button onClick={() => handleTypeFilter("note")}>
          {filterType === "note" ? "*" : null}Notes
        </button>
        <button onClick={() => handleTypeFilter("diary")}>
          {filterType === "diary" ? "*" : null}Diary Entries
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
