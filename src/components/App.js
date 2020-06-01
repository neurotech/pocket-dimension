import React from "react";
import LoginForm from "./LoginForm";
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
    this.setState({ pasted: true });
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
    this.handleFetchItems(event.target.checked);
  };

  handleCreateItem = () => {
    // TODO
  };

  handleLogout = () => {
    sessionStorage.removeItem("token");
    this.setState({ items: [] });
    this.setState({ token: null });
  };

  render() {
    const { theme, token } = this.state;

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
          <ControlBar
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
