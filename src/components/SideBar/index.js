const SideBarItem = require("./SideBarItem");
const LogoutButton = require("./LogoutButton");

module.exports = function createSideBar(fastn, app) {
  var sidebar = fastn(
    "div",
    { class: "sidebar" },
    SideBarItem(fastn, app, "Home", "all"),
    SideBarItem(fastn, app, "Notes", "note"),
    SideBarItem(fastn, app, "Links", "link"),
    SideBarItem(fastn, app, "Diary", "diary"),
    LogoutButton(fastn, app)
  );
  return fastn("div", { class: "sidebar-container" }, sidebar);
};
