module.exports = function createPostButton(fastn, app, title, icon) {
  return fastn("button", { class: "button" }, fastn("span", { class: "title" }, title), icon);
};
