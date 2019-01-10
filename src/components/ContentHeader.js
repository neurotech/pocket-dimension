var typeHeadings = {
  all: "Home",
  note: "Notes",
  link: "Links",
  diary: "Diary"
};

module.exports = function createContentHeader(fastn, app) {
  return fastn("div", { class: "content-header" }, fastn.binding("type", type => typeHeadings[type] || "Home"));
};
