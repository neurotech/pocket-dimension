const Logo = require("../Logo");
const SearchBar = require("../SearchBar");
const DarkMode = require("./DarkMode");
const LogoutButton = require("./LogoutButton");
const Button = require("../Button");

module.exports = function createToolBar(fastn, app) {
  var searchBar = fastn("div", { class: "search-bar-container" }, SearchBar(fastn, app));
  var mode = DarkMode(fastn, app);
  var createPost = fastn(
    "div",
    { class: "create-post" },
    Button(fastn, app, "Create Post", null).on("click", () => {
      app.showCreatePost();
    })
  );
  var controls = fastn(
    "div",
    { class: "controls-container" },
    mode,
    createPost,
    LogoutButton(fastn, app)
  );

  var toolbar = fastn("div", { class: "toolbar-container" }, searchBar, controls);
  return fastn("div", { class: "toolbar" }, Logo(fastn, app), toolbar);
};
