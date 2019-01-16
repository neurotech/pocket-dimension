module.exports = function createTypeSwitcher(fastn, app) {
  return fastn(
    "div",
    { class: "type-switcher" },
    fastn(
      "label",
      fastn("input", {
        type: "radio",
        name: "type",
        value: "note"
      }),
      fastn("span", "Note")
    ),
    fastn(
      "label",
      fastn("input", {
        type: "radio",
        name: "type",
        value: "link"
      }),
      fastn("span", "Link")
    )
  );

  return fastn("list", {
    class: "type-switcher",
    items: { activeType: fastn.binding("post.type"), types: ["Note", "Link", "Diary"] },
    template: function() {
      var type = fastn.binding("item.types", item => item.toLowerCase());
      return fastn(
        "label",
        fastn("input", {
          type: "radio",
          name: type,
          value: type,
          checked: fastn.binding("item", item => item.toLowerCase() === "note")
        }),
        fastn("span", fastn.binding("item"))
      );
    }
  });
};
