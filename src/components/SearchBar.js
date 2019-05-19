module.exports = function createSearchBar(fastn, app) {
  return fastn("input", {
    class: "search-box-input",
    placeholder: "Search",
    value: fastn.binding("filter"),
    oninput: "value:value"
  }).on("submit", event => {
    event.preventDefault();
  });
};
