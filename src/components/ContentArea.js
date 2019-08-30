const ListItem = require("./ListItem");

module.exports = function createContentArea(fastn, app) {
  return fastn("list", {
    insertionFrameTime: 30,
    class: fastn.binding("isLoading", isLoading => ["posts", isLoading && "loading"]),
    // Might have to bind to `items` instead if `items|*`
    // if this gets too slow
    items: fastn.binding(
      "items|*",
      "filter",
      "type",
      "archiveMode",
      (items, filter, type, archiveMode) => {
        var results = items;

        if (!results) {
          return;
        }

        if (archiveMode) {
          results = results.filter(item => item.isArchived === true);
        } else {
          results = results.filter(
            item => item.isArchived === false || item.isArchived === undefined
          );
        }
        if (type !== "all") {
          results = results.filter(item => item.type === type);
        }

        if (filter) {
          results = results.filter(
            item =>
              ~item.title.toLowerCase().indexOf(filter.toLowerCase()) ||
              ~item.body.toLowerCase().indexOf(filter.toLowerCase())
          );
        }

        return results;
      }
    ),
    template: function() {
      return ListItem(fastn, app);
    }
  });
};
