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
        return `type-button ${buttonType} ${type === buttonType && type !== "" ? "active" : "inactive"}`;
      })
    },
    buttonLabel
  ).on("click", () => {
    app.setType(buttonType);
  });
};
