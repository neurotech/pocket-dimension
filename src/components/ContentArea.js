const ContentHeader = require("./ContentHeader");
const ListItem = require("./ListItem");

module.exports = function createContentArea(fastn, app) {
  return fastn("list", {
    insertionFrameTime: 30,
    class: fastn.binding("isLoading", isLoading => [
      'posts',
      isLoading && 'loading'
    ]),
    // Might have to bind to `items` instead if `items|*`
    // if this gets too slow
    items: fastn.binding("items|*", "filter", "type", (items, filter, type) => {
      var results = items;

      if(!results){
        return;
      }

      if (type !== "all") {
        results = results.filter(item => item.type === type);
      }

      if (filter) {
        results = results.filter(
          item => ~item.title.indexOf(filter.toLowerCase()) || ~item.body.indexOf(filter.toLowerCase())
        );
      }

      return results;
    }),
    template: function() {
      return ListItem(fastn, app);
    }
  });
};
