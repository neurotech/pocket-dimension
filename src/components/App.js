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

    let preferredTheme = localStorage.getItem("pocket-dimension:theme");

    if (preferredTheme) {
      this.state.theme = preferredTheme;
    } else {
      localStorage.setItem("pocket-dimension:theme", initialState.theme);
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

  handleTheme = () => {
    const currentTheme = this.state.theme;
    const newTheme = currentTheme === "light" ? "dark" : "light";

    this.setState({ theme: newTheme });
    localStorage.setItem("pocket-dimension:theme", newTheme);
  };

  handleArchiveMode = (event) => {
    this.setState({ archiveMode: event.target.checked });
    this.handleFetchItems(event.target.checked);
  };

  handleCreateItem = () => {
    this.setState({ item: {} });
    this.setState({ dialogOpen: true });
  };

  handleCloseDialog = () => {
    this.setState({ item: {} });
    this.setState({ dialogOpen: false });
  };

  handleLogout = () => {
    sessionStorage.removeItem("token");
    this.setState({ items: [] });
    this.setState({ token: null });
  };

  render() {
    const { dialogOpen, item, theme, token } = this.state;

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
        <div onPaste={this.handlePaste}>
          {dialogOpen && (
            <ItemDialog
              handleFetchItems={this.handleFetchItems}
              handleCloseDialog={this.handleCloseDialog}
              item={item}
            />
          )}
          <ControlBar
            archiveMode={this.state.archiveMode}
            filterText={this.state.filterText}
            filterType={this.state.filterType}
            handleFetchItems={this.handleFetchItems}
            handleItemFilter={this.handleItemFilter}
            handleTypeFilter={this.handleTypeFilter}
            handleTheme={this.handleTheme}
            handleArchiveMode={this.handleArchiveMode}
            handleCreateItem={this.handleCreateItem}
            handleLogout={this.handleLogout}
            theme={theme}
          />
          <Items
            handleFetchItems={this.handleFetchItems}
            filterText={this.state.filterText}
            filterType={this.state.filterType}
            items={this.state.items}
            theme={theme}
          />
        </div>
      );
    }
  }
}
