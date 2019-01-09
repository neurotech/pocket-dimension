module.exports = function createListItemDiary(fastn, app) {
  return fastn(
    "div",
    { class: "diary" },
    fastn("h3", fastn.binding("item.title")),
    fastn("p", fastn.binding("item.body"))
  );
};
