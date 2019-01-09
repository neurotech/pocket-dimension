const Note = require("./Note");
const Link = require("./Link");
const Diary = require("./Diary");

module.exports = function createListItem(fastn, app) {
  return fastn("templater", {
    data: fastn.binding("item"),
    template: function(model) {
      if (model.get("item.type") === "note") return Note(fastn, app);
      if (model.get("item.type") === "link") return Link(fastn, app);
      if (model.get("item.type") === "diary") return Diary(fastn, app);
    }
  });
};
