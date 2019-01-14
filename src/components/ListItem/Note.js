const spacetime = require("spacetime");

module.exports = function createListItemNote(fastn, app) {
  var typeButton = fastn("button", { class: "item-edit note" }, "☷").on("click", (event, scope) => {
    app.setAction("update");
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
    { class: ["note", "post"] },
    fastn("div", { class: "item-title" }, typeButton, removeButton, title, timestamp),
    fastn("div", { class: "item-body" }, fastn.binding("item.body"))
  );
};
