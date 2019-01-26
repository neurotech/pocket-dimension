const LoginForm = require("./LoginForm");
const SideBar = require("./SideBar");
const ToolBar = require("./Toolbar");
const ContentArea = require("./ContentArea");
const CreatePostDialog = require("./CreatePostDialog");

module.exports = function combineComponents(fastn, app) {
  var loginForm = LoginForm(fastn, app);
  var core = fastn(
    "div",
    { class: "core" },
    SideBar(fastn, app),
    ContentArea(fastn, app),
    CreatePostDialog(fastn, app)
  );

  return fastn(
    "div",
    { class: "container", "data-theme": fastn.binding("theme") },
    loginForm,
    ToolBar(fastn, app),
    core
  );
};
