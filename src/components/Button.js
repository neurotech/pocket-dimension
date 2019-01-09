module.exports = function createPostButton(fastn, app, title, styles) {
  return fastn("div", { class: ["button", styles] }, title);
};
