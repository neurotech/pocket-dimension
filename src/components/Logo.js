module.exports = function createLogo(fastn, app) {
  return fastn("div", { class: "logo" }, fastn("div", { class: "logo-text" }, "Pocket Dimension")).on(
    "click",
    app.getAll
  );
};
