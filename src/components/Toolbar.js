const Logo = require("./Logo");
const SearchBar = require("./SearchBar");
const Button = require("./Button");

module.exports = function createToolBar(fastn, app) {
  var createPost = fastn(
    "div",
    { class: "create-post" },
    Button(fastn, app, "Create Post").on("click", (event, scope) => {
      scope.set("dialogOpen", true);
    })
  );
  return fastn(
    "div",
    { class: "toolbar" },
    Logo(fastn, app),
    fastn(
      "div",
      { class: "search-and-create" },
      SearchBar(fastn, app),
      createPost
    )
  );
};
