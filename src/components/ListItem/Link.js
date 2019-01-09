module.exports = function createListItemLink(fastn, app) {
  return fastn(
    "div",
    { class: "link" },
    fastn("h3", fastn.binding("item.title")),
    "(",
    fastn(
      "a",
      { href: fastn.binding("item.body"), target: "_blank" },
      fastn.binding("item.title")
    ),
    ")"
  );
};
