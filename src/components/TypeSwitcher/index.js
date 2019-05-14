const TypeButton = require("./TypeButton");
const Button = require("../Button");

module.exports = function createTypeSwitcher(fastn, app) {
  var typeButtons = fastn(
    "div",
    { class: "type-buttons" },
    TypeButton(fastn, app, "Note"),
    TypeButton(fastn, app, "Link"),
    TypeButton(fastn, app, "Diary")
  );
  var generateTitleButton = fastn(
    "div",
    { class: "generate-title-container" },
    Button(fastn, app, "Generate Title", null, ["generate-title"]).on(
      "click",
      app.generatePostTitle
    )
  );
  return fastn("div", { class: "type-switcher" }, typeButtons, generateTitleButton);
};
