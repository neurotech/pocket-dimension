const Logo = require("../Logo");
const FilterButtons = require("./FilterButtons");
const SearchBar = require("../SearchBar");
const DarkMode = require("./DarkMode");
const LogoutButton = require("./LogoutButton");
const Button = require("../Button");

module.exports = function createToolBar(fastn, app) {
  var searchBar = SearchBar(fastn, app);
  var mode = DarkMode(fastn, app);
  var createPost = fastn(
    "div",
    { class: "create-post" },
    Button(fastn, app, "Create", null).on("click", () => {
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

  var toolbar = fastn(
    "div",
    { class: "toolbar-container" },
    FilterButtons(fastn, app),
    searchBar,
    controls
  );
  return fastn("div", { class: "toolbar" }, Logo(fastn, app), toolbar);
};
