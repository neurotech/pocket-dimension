const TypeButton = require("./TypeButton");

module.exports = function createTypesComponent(fastn, app) {
  return fastn(
    "div",
    { class: "type-switcher" },
    TypeButton(fastn, app, "all", "All"),
    TypeButton(fastn, app, "note", "Notes"),
    TypeButton(fastn, app, "link", "Links"),
    TypeButton(fastn, app, "journal", "Journal")
  );
};
