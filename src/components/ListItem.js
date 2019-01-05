const spacetime = require("spacetime");

module.exports = function createListItemComponent(fastn) {
  return fastn(
    "div",
    { class: "item" },
    fastn("div", { class: "item-title" }, fastn.binding("item.title")),
    fastn(
      //fastn("div", { class: "item-body" }, fastn.binding("item.body")),
      "templater",
      {
        data: fastn.binding("item.type", "item.body", (type, body) => ({
          type,
          body
        })),
        template: function(model) {
          if (model.get("item.type") === "link") {
            return fastn(
              "a",
              {
                href: fastn.binding("item.body"),
                target: "_blank",
                class: "item-link"
              },
              fastn.binding("item.body")
            );
          } else {
            return fastn(
              "div",
              { class: "item-body" },
              fastn.binding("item.body")
            );
          }
        }
      }
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
    ),
    fastn(
      "div",
      { class: fastn.binding("item.type", type => `item-type ${type}`) },
      fastn.binding("item.type")
    )
  );
};
