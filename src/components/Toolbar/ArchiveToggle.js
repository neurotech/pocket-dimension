module.exports = function createArchiveToggle(fastn, app) {
  return fastn(
    "div",
    { class: "archive-mode" },
    fastn(
      "div",
      { class: "archive-mode-wrapper" },
      fastn("input", {
        type: "checkbox",
        class: "archive-mode-toggle",
        checked: fastn.binding("archiveMode", archiveMode => {
          return archiveMode === true;
        })
      }).on("change", event => {
        app.setArchiveMode(event.target.checked);
      }),
      fastn(
        "label",
        {
          class: fastn.binding("archiveMode", archiveMode => {
            return ["archive-mode-label", archiveMode === true && "on"];
          })
        },
        "⌚"
      )
    )
  );
};
