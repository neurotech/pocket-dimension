module.exports = function createExternalLinkIconComponent(fastn) {
  return fastn(
    "svg",
    {
      class: "icon",
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      stroke: "black",
      fill: "none"
    },
    fastn("path", {
      d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
    }),
    fastn("polyline", { points: "15 3 21 3 21 9" }),
    fastn("line", {
      x1: "10",
      y1: "14",
      x2: "21",
      y2: "3"
    })
  );
};
