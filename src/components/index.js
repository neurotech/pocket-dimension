const LoginForm = require("./LoginForm");
const ToolBar = require("./Toolbar");
const ContentArea = require("./ContentArea");
const CreatePostDialog = require("./CreatePostDialog");

module.exports = function combineComponents(fastn, app) {
  var loginForm = LoginForm(fastn, app);
  var core = fastn("div", { class: "core" }, ContentArea(fastn, app), CreatePostDialog(fastn, app));

  return fastn(
    "div",
    { class: "container", "data-theme": fastn.binding("theme") },
    loginForm,
    ToolBar(fastn, app),
    core
  );
};
