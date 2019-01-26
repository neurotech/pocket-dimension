const Logo = require("../Logo");
const SearchBar = require("../SearchBar");
const DarkMode = require("./DarkMode");
const LogoutButton = require("./LogoutButton");
const Button = require("../Button");

module.exports = function createToolBar(fastn, app) {
  var mode = DarkMode(fastn, app);
  var createPostIcon = fastn("span", { class: "icon" }, "☵");
  var createPost = fastn(
    "div",
    { class: "create-post" },
    Button(fastn, app, "Create Post", createPostIcon).on("click", () => {
      app.showCreatePost();
    })
  );
  var buttons = fastn(
    "div",
    { class: "search-and-create-container" },
    fastn(
      "div",
      { class: "search-and-create" },
      SearchBar(fastn, app),
      mode,
      createPost,
      LogoutButton(fastn, app)
    )
  );
  return fastn("div", { class: "toolbar" }, Logo(fastn, app), buttons);
};
