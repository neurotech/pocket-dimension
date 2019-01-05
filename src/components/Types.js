const TypeButton = require("./TypeButton");

module.exports = function createTypesComponent(fastn, app) {
  return fastn(
    "div",
    { class: "type-switcher" },
    TypeButton(fastn, app, "note", "Notes"),
    TypeButton(fastn, app, "link", "Link"),
    TypeButton(fastn, app, "journal", "Journal"),
    TypeButton(fastn, app, "", "Reset")
  );
};
