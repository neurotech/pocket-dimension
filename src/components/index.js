const ToolBar = require("./ToolBar");
const SideBar = require("./SideBar");
const ContentArea = require("./ContentArea");
const CreatePostDialog = require("./CreatePostDialog");

module.exports = function combineComponents(fastn, app) {
  var top = ToolBar(fastn, app);
  var core = fastn(
    "div",
    { class: "core" },
    SideBar(fastn, app),
    CreatePostDialog(fastn, app),
    ContentArea(fastn, app)
  );

  return fastn(
    "div",
    {
      class: fastn.binding("isLoading", isLoading => {
        return `container ${isLoading ? "loading" : ""}`;
      })
    },
    top,
    core
  );
};
