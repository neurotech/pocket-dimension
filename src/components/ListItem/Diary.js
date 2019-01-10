const spacetime = require("spacetime");

module.exports = function createListItemDiary(fastn, app) {
  var type = fastn("div", { class: "item-type diary" }, "☰");
  var timestamp = fastn(
    "div",
    { class: "item-timestamp" },
    fastn.binding("item.timestamp", function(time) {
      var now = spacetime();
      var tz = now.timezone().name;
      return spacetime(time)
        .goto(tz)
        .format("{day} {date-ordinal} {month} {year} at {time}");
    })
  );
  return fastn(
    "div",
    { class: ["diary", "post"] },
    fastn("div", { class: "item-title" }, type, fastn.binding("item.title"), timestamp),
    fastn("div", { class: "item-body" }, fastn.binding("item.body"))
  );
};
