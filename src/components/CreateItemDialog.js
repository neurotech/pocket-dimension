module.exports = function createCreateItemDialogomponent(fastn, app) {
  return fastn(
    "form",
    {
      class: fastn.binding("dialogOpen", function(dialogOpen) {
        return `create-item-dialog ${!dialogOpen ? "hidden" : ""}`;
      })
    },
    fastn("input", {
      class: "create-item-title",
      placeholder: "Title",
      value: fastn.binding("itemTitle"),
      onchange: "value:value"
    }),
    fastn("input", {
      class: "create-item-body",
      placeholder: "Body",
      value: fastn.binding("itemBody"),
      onchange: "value:value"
    }),
    fastn("button", { type: "submit" }, "Submit")
  ).on("submit", (event, scope) => {
    event.preventDefault();
    console.table([
      { title: scope.get("itemTitle"), body: scope.get("itemBody") }
    ]);

    app.getAll(true);

    scope.set("dialogOpen", false);
    scope.set("itemTitle", "");
    scope.set("itemBody", "");
  });
};
