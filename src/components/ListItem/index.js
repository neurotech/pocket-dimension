const itemTypes = {
  note: require("./Note"),
  link: require("./Link"),
  diary: require("./Diary")
};

module.exports = function createListItem(fastn, app) {
  return fastn("templater", {
    data: fastn.binding("item"),
    template: function(model) {
      var type = model.get("item.type");
      return type in itemTypes && itemTypes[model.get("item.type")](fastn, app);
    }
  });
};
