module.exports = function createContentHeader(fastn, app) {
  return fastn(
    "h2",
    fastn.binding("type", function(type) {
      var heading = "";
      switch (type) {
        case "all":
          heading = "Home";
          break;

        case "note":
          heading = "Notes";
          break;

        case "link":
          heading = "Links";
          break;

        case "diary":
          heading = "Diary";
          break;

        default:
          heading = "Home";
          break;
      }
      return heading;
    })
  );
};
