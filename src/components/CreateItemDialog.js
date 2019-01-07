const api = require("../api");

function post(event, scope, app) {
  scope.set("isLoading", true);
  event.preventDefault();
  api.post(
    {
      title: scope.get("itemTitle"),
      body: scope.get("itemBody"),
      type: "note"
    },
    function(err) {
      scope.set("isLoading", false);
      if (err) return console.error(err);
      scope.set("dialogOpen", false);
      scope.set("itemTitle", "");
      scope.set("itemBody", "");
      app.getAll(true);
    }
  );
}

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
      required: true,
      value: fastn.binding("itemTitle"),
      onchange: "value:value"
    }),
    fastn("textarea", {
      disabled: fastn.binding("dialogOpen", dialog => {
        return !dialog;
      }),
      class: "create-item-body",
      placeholder: "Body",
      required: true,
      value: fastn.binding("itemBody"),
      onkeydown: "value:value",
      onchange: "value:value"
    }).on("keydown", (event, scope) => {
      if (!(event.ctrlKey && event.keyCode === 13)) return;
      var target = event.target;
      if (target.form) {
        post(event, scope, app);
      }
    }),
    fastn(
      "div",
      { class: "create-item-buttons " },
      fastn(
        "button",
        {
          class: "create-item-submit",
          type: "submit",
          disabled: fastn.binding("dialogOpen", dialog => {
            return !dialog;
          })
        },
        "Submit"
      ),
      fastn(
        "button",
        {
          class: "create-item-cancel",
          type: "cancel",
          disabled: fastn.binding("dialogOpen", dialog => {
            return !dialog;
          })
        },
        "Cancel"
      ).on("click", (event, scope) => {
        scope.set("dialogOpen", false);
      })
    )
  ).on("submit", (event, scope) => {
    event.preventDefault();
    post(event, scope, app);
  });
};
