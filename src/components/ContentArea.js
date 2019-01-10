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
          var results = items;

          if(type !== 'all'){
            results = results.filter(item => item.type === type);
          }

          if(filter){
            results = results.filter(item =>
              ~item.title.indexOf(filter.toLowerCase()) ||
              ~item.body.indexOf(filter.toLowerCase())
            );
          }

          return results;
        }
      ),
      template: function() {
        return ListItem(fastn, app);
      }
    })
  );
};
