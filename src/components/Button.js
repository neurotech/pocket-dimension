module.exports = function createPostButton(fastn, app, title, styles) {
  return fastn("button", { class: ["button", styles] }, title);
};
