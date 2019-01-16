const TypeButton = require("./TypeButton");

module.exports = function createTypeSwitcher(fastn, app) {
  return fastn(
    "div",
    { class: "type-switcher" },
    TypeButton(fastn, app, "Note"),
    TypeButton(fastn, app, "Link"),
    TypeButton(fastn, app, "Diary")
  );
};
