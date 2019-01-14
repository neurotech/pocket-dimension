const spacetime = require("spacetime");

module.exports = function createListItemLink(fastn, app) {
  var typeButton = fastn("button", { class: "item-edit link" }, "☲").on("click", (event, scope) => {
    app.setPost(scope.get("item"));
  });
  var removeButton = fastn("button", { class: "item-remove" }, "×").on("click", (event, scope) => {
    app.deletePost(scope.get("item.id"), scope.get("item.timestamp"));
  });
  var title = fastn("div", { class: "item-title-text" }, fastn.binding("item.title"));
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
    fastn("div", { class: "item-title" }, typeButton, removeButton, title, timestamp),
    fastn("a", { class: "item-body", href: fastn.binding("item.body"), target: "_blank" }, fastn.binding("item.body"))
  );
};
