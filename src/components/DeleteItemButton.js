const api = require("../api");

module.exports = function createDeleteItemButtonComponent(fastn, app) {
  return fastn("div", { class: "button item-delete-button" }, "Delete").on(
    "click",
    (event, scope) => {
      scope.set("isLoading", true);
      var id = scope.get("item.id");
      var timestamp = scope.get("item.timestamp");

      api.delete.item(id, timestamp, function(err, res) {
        scope.set("isLoading", false);
        if (err) return console.error(err);
        app.getAll();
      });
    }
  );
};
