import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import ItemDialog from "./ItemDialog.js";
import ControlBar from "./ControlBar/ControlBar.js";
import Items from "./Items";
import initialState from "../util/initialState.js";
import { fetchItems } from "../util/asyncActions.js";

const App = () => {
  const [archiveMode, setArchiveMode] = useState(initialState.archiveMode);
  const [darkMode, setDarkMode] = useState(initialState.darkMode);
  const [dialogOpen, setDialogOpen] = useState(initialState.dialogOpen);
  const [error, setError] = useState(initialState.error);
  const [filterText, setFilterText] = useState(initialState.filterText);
  const [filterType, setFilterType] = useState(initialState.filterType);
  const [item, setItem] = useState(initialState.item);
  const [items, setItems] = useState(initialState.items);
  const [pasted, setPasted] = useState(initialState.pasted);
  const [token, setToken] = useState(initialState.token);

  const handlePaste = () => {
    !dialogOpen && setPasted(true);
  };

  const handleFetchItems = async (archived) => {
    try {
      let fetchedItems = await fetchItems(archived);
      setItems(fetchedItems);
    } catch (error) {
      console.error(error);
    }
  };

  const handleItemFilter = (event) => {
    const input = event ? event.target.value : "";
    setFilterText(input);
  };

  const handleTypeFilter = (type) => {
    setFilterType(type);
  };

  const handleDarkMode = (event) => {
    const toggle = event.target.checked;

    setDarkMode(toggle);
    localStorage.setItem("pocket-dimension:dark-mode", toggle);
  };

  const handleArchiveMode = (event) => {
    setArchiveMode(event.target.checked);
    handleFetchItems(event.target.checked);
  };

  const handleEditItem = (item) => {
    setItem(item);
    setDialogOpen(true);
  };

  const handleCreateItem = () => {
    setItem(null);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setItem(null);
    setDialogOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setItems([]);
    setToken(null);
  };

  useEffect(() => {
    let darkMode = localStorage.getItem("pocket-dimension:dark-mode");

    if (darkMode) {
      darkMode = JSON.parse(darkMode);
    } else {
      localStorage.setItem("pocket-dimension:dark-mode", initialState.darkMode);
    }
  }, []);

  if (!sessionStorage.getItem("token") && !token) {
    return <LoginForm setToken={setToken} />;
  } else {
    return (
      <div
        style={{
          backgroundColor: darkMode ? "black" : "white",
        }}
        onPaste={handlePaste}
      >
        {dialogOpen && (
          <ItemDialog
            handleCloseDialog={handleCloseDialog}
            handleFetchItems={handleFetchItems}
            item={item}
          />
        )}
        <ControlBar
          archiveMode={archiveMode}
          darkMode={darkMode}
          filterText={filterText}
          filterType={filterType}
          handleFetchItems={handleFetchItems}
          handleItemFilter={handleItemFilter}
          handleTypeFilter={handleTypeFilter}
          handleDarkMode={handleDarkMode}
          handleArchiveMode={handleArchiveMode}
          handleCreateItem={handleCreateItem}
          handleLogout={handleLogout}
        />
        <Items
          archiveMode={archiveMode}
          darkMode={darkMode}
          filterText={filterText}
          filterType={filterType}
          handleEditItem={handleEditItem}
          handleFetchItems={handleFetchItems}
          items={items}
        />
      </div>
    );
  }
};

export default App;
