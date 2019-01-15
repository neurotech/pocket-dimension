module.exports = function createPostButton(fastn, app, title, icon, styles) {
  return fastn(
    "button",
    { class: ["button", styles] },
    fastn("span", { class: "title" }, title),
    icon
  );
};
