const ToolBar = require("./ToolBar");
const SideBar = require("./SideBar");
const ContentArea = require("./ContentArea");
const CreatePostDialog = require("./CreatePostDialog");

module.exports = function combineComponents(fastn, app) {
  var sideBar = SideBar(fastn, app);
  var core = fastn(
    "div",
    { class: "core" },
    ToolBar(fastn, app),
    ContentArea(fastn, app),
    CreatePostDialog(fastn, app)
  );

  return fastn(
    "div",
    {
      class: fastn.binding("isLoading", isLoading => ["container", isLoading && "loading"])
    },
    sideBar,
    core
  );
};
