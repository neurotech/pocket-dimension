module.exports = function createSearchBar(fastn, app) {
  return fastn(
    "form",
    { class: "search-box" },
    fastn("input", {
      class: "search-box-input",
      placeholder: "Search for a post",
      autofocus: true,
      value: fastn.binding("filter"),
      oninput: "value:value"
    })
  );
};
