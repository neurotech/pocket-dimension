var typeHeadings = {
  "all": "Home",
  "note": "Notes",
  "link": "Links",
  "diary": "Diary"
};

module.exports = function createContentHeader(fastn, app) {
  return fastn(
    "h2",
    fastn.binding("type", type => typeHeadings[type] || "Home")
  );
};
