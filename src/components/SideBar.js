const SideBarItem = require("./SideBarItem");

module.exports = function createSideBar(fastn, app) {
  return fastn(
    "div",
    { class: "sidebar" },
    SideBarItem(fastn, app, "Home", "all"),
    SideBarItem(fastn, app, "Notes", "note"),
    SideBarItem(fastn, app, "Links", "link"),
    SideBarItem(fastn, app, "Diary", "diary")
  );
};
