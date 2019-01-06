const CreateItemButton = require("./CreateItemButton");
const SearchBox = require("./SearchBox");

module.exports = function createToolbar(fastn) {
  return fastn(
    "div",
    { class: "toolbar" },
    SearchBox(fastn),
    CreateItemButton(fastn)
  );
};
