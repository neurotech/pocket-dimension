module.exports = function createSideBarItem(fastn, app, title, itemType) {
  return fastn(
    "div",
    {
      class: fastn.binding("type", function(type) {
        return [
          "sidebar-item",
          title.toLowerCase(),
          `${type === itemType && type !== "" ? "active" : "inactive"}`
        ];
      })
    },
    title
  ).on("click", () => {
    app.setType(itemType ? itemType : title.toLowerCase());
  });
};
