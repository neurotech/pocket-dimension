const spacetime = require("spacetime");

module.exports = function createListItemLink(fastn, app) {
  var type = fastn("div", { class: "item-type link" }, "☲");
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
    { class: ["link", "post"] },
    fastn("div", { class: "item-title" }, type, fastn.binding("item.title"), timestamp),
    fastn("a", { class: "item-body", href: fastn.binding("item.body"), target: "_blank" }, fastn.binding("item.body"))
  );
};
