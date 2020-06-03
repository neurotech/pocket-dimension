import React from "react";
import LoginForm from "./LoginForm";
import ItemDialog from "./ItemDialog.js";
import ControlBar from "./ControlBar/ControlBar.js";
import Items from "./Items";
import initialState from "../util/initialState.js";
import { fetchItems } from "../util/asyncActions.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    let darkMode = localStorage.getItem("pocket-dimension:dark-mode");

    if (darkMode) {
      this.state.darkMode = JSON.parse(darkMode);
    } else {
      localStorage.setItem("pocket-dimension:dark-mode", initialState.darkMode);
    }
  }

  handlePaste = () => {
    !this.state.dialogOpen && this.setState({ pasted: true });
  };

  handleFetchItems = (archived) => {
    fetchItems(this, sessionStorage.getItem("token"), archived);
  };

  handleItemFilter = (event) => {
    const input = event ? event.target.value : "";
    this.setState({ filterText: input });
  };

  handleTypeFilter = (type) => {
    this.setState({ filterType: type });
  };

  handleDarkMode = (event) => {
    const toggle = event.target.checked;

    this.setState({ darkMode: toggle });
    localStorage.setItem("pocket-dimension:dark-mode", toggle);
  };

  handleArchiveMode = (event) => {
    this.setState({ archiveMode: event.target.checked });
    this.handleFetchItems(event.target.checked);
  };

  handleEditItem = (item) => {
    this.setState({ item: item });
    this.setState({ dialogOpen: true });
  };

  handleCreateItem = () => {
    this.setState({ item: null });
    this.setState({ dialogOpen: true });
  };

  handleCloseDialog = () => {
    this.setState({ item: null });
    this.setState({ dialogOpen: false });
  };

  handleLogout = () => {
    sessionStorage.removeItem("token");
    this.setState({ items: [] });
    this.setState({ token: null });
  };

  render() {
    const { archiveMode, dialogOpen, item, darkMode, token } = this.state;

    if (!sessionStorage.getItem("token") && !token) {
      return (
        <LoginForm
          setToken={(token) => {
            this.setState({ token });
          }}
        />
      );
    } else {
      return (
        <div
          style={{
            backgroundColor: darkMode ? "black" : "white",
          }}
          onPaste={this.handlePaste}
        >
          {dialogOpen && (
            <ItemDialog
              handleCloseDialog={this.handleCloseDialog}
              handleFetchItems={this.handleFetchItems}
              item={item}
            />
          )}
          <ControlBar
            archiveMode={this.state.archiveMode}
            darkMode={darkMode}
            filterText={this.state.filterText}
            filterType={this.state.filterType}
            handleFetchItems={this.handleFetchItems}
            handleItemFilter={this.handleItemFilter}
            handleTypeFilter={this.handleTypeFilter}
            handleDarkMode={this.handleDarkMode}
            handleArchiveMode={this.handleArchiveMode}
            handleCreateItem={this.handleCreateItem}
            handleLogout={this.handleLogout}
          />
          <Items
            archiveMode={archiveMode}
            darkMode={darkMode}
            filterText={this.state.filterText}
            filterType={this.state.filterType}
            handleEditItem={this.handleEditItem}
            handleFetchItems={this.handleFetchItems}
            items={this.state.items}
          />
        </div>
      );
    }
  }
}
