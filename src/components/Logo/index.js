const Stars = require("./Stars");

module.exports = function createLogo(fastn, app) {
  var stars = fastn("div", { class: "logo-stars-container" }, Stars());
  var logo = fastn(
    "div",
    { class: "logo" },
    fastn(
      "div",
      {
        class: fastn.binding("isLoading", isLoading => {
          return ["logo-text", isLoading && "loading"];
        })
      },
      "↻"
    )
  );
  return fastn("div", { class: "logo-container" }, stars, logo).on("click", app.getAllItems);
};
