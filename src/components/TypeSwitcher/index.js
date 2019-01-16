const TypeButton = require("./TypeButton");
const Button = require("../Button");

module.exports = function createTypeSwitcher(fastn, app) {
  var icon = fastn("span", { class: "icon" }, "☵");

  return fastn(
    "div",
    { class: "type-switcher" },
    TypeButton(fastn, app, "Note"),
    TypeButton(fastn, app, "Link"),
    TypeButton(fastn, app, "Diary"),
    Button(fastn, app, "Generate Title", icon).on("click", app.generatePostTitle)
  );
};
