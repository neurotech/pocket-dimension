const ContentHeader = require("./ContentHeader");
const ListItem = require("./ListItem");

module.exports = function createContentArea(fastn, app) {
  return fastn(
    "div",
    { class: "content-area" },
    ContentHeader(fastn, app),
    fastn("list", {
      insertionFrameTime: 30,
      class: fastn.binding("isLoading", function(isLoading) {
        return `posts ${isLoading ? "loading" : ""}`;
      }),
      // Might have to bind to `items` instead if `items|*`
      // if this gets too slow
      items: fastn.binding(
        "items|*",
        "filter",
        "type",
        (items, filter, type) => {
          if ((filter === "" && type === "all") || !items) return items;

          // Type selected, no filter
          if (type !== "all" && filter === "")
            return items.filter(item => item.type === type);

          // Type selected, filter applied
          if (type !== "all" && filter !== "") {
            var filtered = items.filter(
              item =>
                ~item.title.indexOf(filter.toLowerCase()) ||
                ~item.body.indexOf(filter.toLowerCase())
            );
            return filtered.filter(item => item.type === type);
          }

          // Filter applied, no type
          if (filter !== "" && type === "all") {
            return items.filter(
              item =>
                ~item.title.indexOf(filter.toLowerCase()) ||
                ~item.body.indexOf(filter.toLowerCase())
            );
          }
        }
      ),
      template: function() {
        return ListItem(fastn, app);
      }
    })
  );
};
