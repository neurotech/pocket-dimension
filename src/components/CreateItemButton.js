module.exports = function createCreateItemButtonComponent(fastn) {
  return fastn("div", { class: "create-item-button" }, "Create Post").on(
    "click",
    (event, scope) => {
      scope.set("dialogOpen", true);
    }
  );
};
