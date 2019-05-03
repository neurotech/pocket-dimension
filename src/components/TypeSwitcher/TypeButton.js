module.exports = function createTypeButton(fastn, app, title) {
  return fastn(
    "label",
    { class: "type-switcher-item" },
    fastn("input", {
      type: "radio",
      name: "type",
      class: "type-switcher-input",
      value: title.toLowerCase(),
      checked: fastn.binding("type", type => {
        return type === title.toLowerCase() ? "checked" : "";
      })
    }),
    fastn("span", { class: ["type-switcher-button", title.toLowerCase()] }, title)
  ).on("click", () => {
    app.setPostType(title.toLowerCase());
    if (title.toLowerCase() === "link") {
      document.querySelector(".create-post-body").focus();
    } else {
      document.querySelector(".create-post-title").focus();
    }
  });
};
