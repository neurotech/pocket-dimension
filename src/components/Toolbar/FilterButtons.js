module.exports = function(fastn, app) {
  var homeButton = fastn(
    "button",
    {
      class: fastn.binding("type", function(type) {
        return ["filter-button", "all", type === "all" && type !== "" ? "active" : "inactive"];
      })
    },
    "🏠"
  ).on("click", (event, scope) => {
    app.setType("all");
  });
  var linksButton = fastn(
    "button",
    {
      class: fastn.binding("type", function(type) {
        return ["filter-button", "link", type === "link" && type !== "" ? "active" : "inactive"];
      })
    },
    "🔗"
  ).on("click", (event, scope) => {
    app.setType("link");
  });
  var notesButton = fastn(
    "button",
    {
      class: fastn.binding("type", function(type) {
        return ["filter-button", "note", type === "note" && type !== "" ? "active" : "inactive"];
      })
    },
    "📜"
  ).on("click", (event, scope) => {
    app.setType("note");
  });
  var diariesButton = fastn(
    "button",
    {
      class: fastn.binding("type", function(type) {
        return ["filter-button", "diary", type === "diary" && type !== "" ? "active" : "inactive"];
      })
    },
    "📕"
  ).on("click", (event, scope) => {
    app.setType("diary");
  });

  var filterButtons = fastn(
    "div",
    { class: "filter-buttons-container" },
    homeButton,
    linksButton,
    notesButton,
    diariesButton
  );

  return filterButtons;
};
