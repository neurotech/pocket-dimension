const spacetime = require("spacetime");
const api = require("../api");
const EditItemButton = require("./EditItemButton");
const DeleteItemButton = require("./DeleteItemButton");

const ExternalLinkIcon = require("./ExternalLinkIcon");

module.exports = function createListItemComponent(fastn, app) {
  return fastn(
    "div",
    { class: "item" },
    fastn(
      "div",
      { class: fastn.binding("item.type", type => `item-type ${type}`) },
      fastn.binding("item.type")
    ),
    fastn(
      "div",
      { class: "item-title", contenteditable: true },
      fastn.binding("item.title")
    )
      .on("blur", (event, scope) => {
        var oldTitle = scope.get("item.title");
        var newTitle = event.srcElement.innerText;
        if (oldTitle !== newTitle) {
          api.update(
            {
              id: scope.get("item.id"),
              timestamp: scope.get("item.timestamp"),
              title: event.srcElement.innerText,
              body: scope.get("item.body")
            },
            function(err) {
              scope.set("isLoading", false);
              if (err) return console.error(err);
              app.getAll();
            }
          );
        }
      })
      .on("keypress", event => {
        if (event.which === 13) {
          event.srcElement.blur();
          event.preventDefault();
        }
      }),
    fastn("templater", {
      data: fastn.binding(
        "item.id",
        "item.timestamp",
        "item.type",
        "item.title",
        "item.body",
        (id, timestamp, type, title, body) => ({
          id,
          timestamp,
          type,
          title,
          body
        })
      ),
      template: function(model) {
        if (model.get("item.type") === "link") {
          return fastn(
            "div",
            { class: "item-body" },
            ExternalLinkIcon(fastn),
            fastn(
              "a",
              {
                href: fastn.binding("item.body"),
                target: "_blank",
                contenteditable: true,
                class: "item-link"
              },
              fastn.binding("item.body")
            )
              .on("blur", (event, scope) => {
                var oldBody = scope.get("item.body");
                var newBody = event.srcElement.innerText;
                if (oldBody !== newBody) {
                  api.update(
                    {
                      id: scope.get("item.id"),
                      timestamp: scope.get("item.timestamp"),
                      title: scope.get("item.title"),
                      body: event.srcElement.innerText
                    },
                    function(err) {
                      scope.set("isLoading", false);
                      if (err) return console.error(err);
                      app.getAll();
                    }
                  );
                }
              })
              .on("keypress", event => {
                if (event.which === 13) {
                  event.srcElement.blur();
                  event.preventDefault();
                }
              })
          );
        } else {
          return fastn(
            "div",
            {
              class: "item-body",
              contenteditable: true
            },
            fastn.binding("item.body")
          )
            .on("blur", (event, scope) => {
              var oldBody = scope.get("item.body");
              var newBody = event.srcElement.innerText;
              if (oldBody !== newBody) {
                api.update(
                  {
                    id: scope.get("item.id"),
                    timestamp: scope.get("item.timestamp"),
                    title: scope.get("item.title"),
                    body: event.srcElement.innerText
                  },
                  function(err) {
                    scope.set("isLoading", false);
                    if (err) return console.error(err);
                    app.getAll();
                  }
                );
              }
            })
            .on("keypress", event => {
              if (event.ctrlKey && event.which === 10) {
                event.srcElement.blur();
                event.preventDefault();
              }
            });
        }
      }
    }),
    fastn(
      "div",
      { class: "item-footer" },
      fastn(
        "div",
        { class: "item-edit-delete" },
        EditItemButton(fastn, app),
        DeleteItemButton(fastn, app)
      ),
      fastn(
        "div",
        { class: "item-nicetime" },
        fastn.binding("item.timestamp", function(time) {
          var now = spacetime();
          var tz = now.timezone().name;
          return spacetime(time)
            .goto(tz)
            .format("{day} {date-ordinal} {month} {year} at {time}");
        })
      )
    )
  );
};
