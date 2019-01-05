const spacetime = require("spacetime");

module.exports = function createListItemComponent(fastn) {
  return fastn(
    "div",
    { class: "item" },
    fastn("div", { class: "item-title" }, fastn.binding("item.title")),
    fastn("div", { class: "item-body" }, fastn.binding("item.body")),
    fastn(
      "div",
      { class: "item-nicetime" },
      fastn.binding("item.timestamp", function(time) {
        var now = spacetime();
        var tz = now.timezone().name;
        return spacetime(time)
          .goto(tz)
          .format("{day} {date-ordinal} {month} {year} at {time}");
      })
    ),
    fastn("div", { class: "item-type" }, fastn.binding("item.type"))
  );
};
