module.exports = function createTypeButtonComponent(
  fastn,
  app,
  buttonType,
  buttonLabel
) {
  return fastn(
    "div",
    {
      class: fastn.binding("type", function(type) {
        return `type-${buttonType}-button ${type === buttonType ? "active" : "inactive"}`;
      })
    },
    buttonLabel
  ).on("click", () => {
    app.setType(buttonType);
  });
};
