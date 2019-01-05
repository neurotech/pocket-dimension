module.exports = function createCreateItemButtonComponent(fastn) {
  return fastn("div", { class: "create-item-button" }, "New Item").on(
    "click",
    (event, scope) => {
      scope.set("dialogOpen", true);
    }
  );
};
