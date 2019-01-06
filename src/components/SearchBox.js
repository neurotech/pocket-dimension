module.exports = function createSearchBoxComponent(fastn) {
  return fastn(
    "form",
    { class: "search-box-form" },
    fastn("input", {
      class: "search-box",
      placeholder: "Search for a post",
      autofocus: true,
      value: fastn.binding("filter"),
      oninput: "value:value"
    })
  );
};
