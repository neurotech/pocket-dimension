const ListItem = require("./ListItem");

module.exports = function createListComponent(fastn) {
  return fastn("list", {
    class: fastn.binding("isLoading", function(isLoading) {
      return `item-list ${isLoading ? "loading" : ""}`;
    }),
    items: fastn.binding("items|*", "filter", "type", (items, filter, type) => {
      if ((filter === "" && type === "") || !items) return items;

      // Type selected, no filter
      if (type !== "" && filter === "")
        return items.filter(item => item.type === type);

      // Type selected, filter applied
      if (type !== "" && filter !== "") {
        var filtered = items.filter(
          item =>
            ~item.title.indexOf(filter.toLowerCase()) ||
            ~item.body.indexOf(filter.toLowerCase())
        );
        return filtered.filter(item => item.type === type);
      }

      // Filter applied, no type
      if (filter !== "" && type == "") {
        return items.filter(
          item =>
            ~item.title.indexOf(filter.toLowerCase()) ||
            ~item.body.indexOf(filter.toLowerCase())
        );
      }
    }),
    template: function() {
      return ListItem(fastn);
    }
  });
};
