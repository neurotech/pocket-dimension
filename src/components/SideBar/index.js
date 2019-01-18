const Logo = require("./Logo");
const SideBarItem = require("./SideBarItem");
const Separator = require("./Separator");
const LogoutButton = require("./LogoutButton");

module.exports = function createSideBar(fastn, app) {
  return fastn(
    "div",
    { class: "sidebar" },
    Logo(fastn, app),
    SideBarItem(fastn, app, "Home", "all"),
    SideBarItem(fastn, app, "Notes", "note"),
    SideBarItem(fastn, app, "Links", "link"),
    SideBarItem(fastn, app, "Diary", "diary"),
    Separator(fastn, app),
    LogoutButton(fastn, app)
  );
};
