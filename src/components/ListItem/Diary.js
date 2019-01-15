const spacetime = require("spacetime");
const syntax = require("../../syntax");

module.exports = function createListItemDiary(fastn, app) {
  var typeButton = fastn("button", { class: "item-edit diary" }, "☰").on("click", (event, scope) => {
    app.editPost(scope.get("item"));
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
    fastn("markdown", {
      options: { highlight: syntax },
      content: fastn.binding("item.body"),
      class: "item-body"
    })
  );
};
