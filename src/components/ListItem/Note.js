const { DateTime } = require("luxon");
const syntax = require("../../syntax");

module.exports = function createListItemNote(fastn, app) {
  var typeButton = fastn("button", { class: "item-edit note" }, "📜").on(
    "click",
    (event, scope) => {
      app.editPost(scope.get("item"));
    }
  );
  var focusButton = fastn("button", { class: "item-focus" }, "∷").on("click", (event, scope) => {
    app.focusPost(scope.get("item.title"));
  });
  var archiveButton = fastn("button", { class: "item-archive" }, "⧖").on(
    "click",
    (event, scope) => {
      app.archivePost(scope.get("item"));
    }
  );
  var removeButton = fastn("button", { class: "item-remove" }, "×").on("click", (event, scope) => {
    app.deletePost(scope.get("item.id"), scope.get("item.timestamp"));
  });
  var title = fastn("div", { class: "item-title-text" }, fastn.binding("item.title"));
  var timestamp = fastn(
    "div",
    { class: "item-timestamp" },
    fastn.binding("item.timestamp", function(time) {
      var now = DateTime.fromISO(time);
      var tz = now.zoneName;
      var offset = now.setZone(tz);
      return offset.toFormat("'Posted on' EEEE dd MMMM yyyy 'at' t");
    })
  );
  return fastn(
    "div",
    { class: ["note", "post"] },
    fastn(
      "div",
      { class: "item-title" },
      typeButton,
      removeButton,
      archiveButton,
      focusButton,
      title,
      timestamp
    ),
    fastn("markdown", {
      options: { highlight: syntax.highlight },
      content: fastn.binding("item.body"),
      class: "item-body"
    })
  );
};
