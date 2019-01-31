module.exports = function createDarkModeToggle(fastn, app) {
  return fastn(
    "div",
    { class: "dark-mode" },
    fastn(
      "div",
      { class: "dark-mode-wrapper" },
      fastn("input", {
        type: "checkbox",
        class: "dark-mode-toggle",
        checked: fastn.binding("theme", theme => {
          return theme === "dark";
        })
      }).on("change", event => {
        app.setTheme(event.target.checked);
      }),
      fastn(
        "label",
        {
          class: fastn.binding("theme", theme => {
            return ["dark-mode-label", theme === "dark" && "on"];
          })
        },
        "💡"
      )
    )
  );
};
