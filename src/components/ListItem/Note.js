module.exports = function createListItemNote(fastn, app) {
  return fastn(
    "div",
    { class: "note" },
    fastn("h3", fastn.binding("item.title")),
    fastn("p", fastn.binding("item.body"))
  );
};
