const api = require("../api");

module.exports = function createCreateItemDialogomponent(fastn, app) {
  return fastn(
    "form",
    {
      class: fastn.binding("dialogOpen", function(dialogOpen) {
        return `create-item-dialog ${!dialogOpen ? "hidden" : ""}`;
      })
    },
    fastn("input", {
      disabled: fastn.binding("dialogOpen", dialog => {
        return !dialog;
      }),
      class: "create-item-title",
      placeholder: "Title",
      value: fastn.binding("itemTitle"),
      onchange: "value:value"
    }),
    fastn("input", {
      disabled: fastn.binding("dialogOpen", dialog => {
        return !dialog;
      }),
      class: "create-item-body",
      placeholder: "Body",
      value: fastn.binding("itemBody"),
      onchange: "value:value"
    }),
    fastn(
      "button",
      {
        type: "submit",
        disabled: fastn.binding("dialogOpen", dialog => {
          return !dialog;
        })
      },
      "Submit"
    )
  ).on("submit", (event, scope) => {
    event.preventDefault();
    api.post(
      {
        title: scope.get("itemTitle"),
        body: scope.get("itemBody"),
        type: "note"
      },
      function(err, data) {
        if (err) return console.error(err);

        console.log(data);
        app.getAll(true);
        scope.set("dialogOpen", false);
        scope.set("itemTitle", "");
        scope.set("itemBody", "");
      }
    );
  });
};
