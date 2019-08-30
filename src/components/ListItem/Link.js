const { DateTime } = require("luxon");

module.exports = function createListItemLink(fastn, app) {
  var typeButton = fastn("button", { class: "item-edit link" }, "🔗").on(
    "click",
    (event, scope) => {
      app.editPost(scope.get("item"));
    }
  );
  var focusButton = fastn("button", { class: "item-focus" }, "∷").on("click", (event, scope) => {
    app.focusPost(scope.get("item.title"));
  });
  var removeButton = fastn("button", { class: "item-remove" }, "×").on("click", (event, scope) => {
    app.deletePost(scope.get("item.id"), scope.get("item.timestamp"));
  });
  var title = fastn(
    "div",
    { class: "item-title-text" },
    fastn(
      "a",
      { class: "item-body", href: fastn.binding("item.body"), target: "_blank" },
      fastn.binding("item.title")
    )
  );
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
    { class: ["link", "post"] },
    fastn("div", { class: "item-title" }, typeButton, removeButton, focusButton, title, timestamp)
  );
};
