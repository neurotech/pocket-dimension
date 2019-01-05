module.exports = function createSearchBoxComponent(fastn) {
  return fastn(
    "form",
    fastn("input", {
      class: "search-box",
      autofocus: true,
      value: fastn.binding("filter"),
      oninput: "value:value"
    })
  );
};
