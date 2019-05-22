module.exports = function createSearchBar(fastn, app) {
  var clearIcon = fastn("button", { class: "search-box-clear", type: "reset" }, "×").on(
    "click",
    event => {
      app.clearFocusPost();
    }
  );
  var searchBar = fastn("input", {
    class: "search-box-input",
    placeholder: "Search",
    value: fastn.binding("filter"),
    oninput: "value:value",
    type: "text"
  }).on("submit", event => {
    event.preventDefault();
  });
  return fastn("div", { class: "search-bar-container" }, searchBar, clearIcon);
};
