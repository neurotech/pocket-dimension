function LogoStarField(fastn, app) {
  var stop1a = fastn("stop:svg", { offset: "80%", "stop-color": "#000000" });
  var stop1b = fastn("stop:svg", { offset: "95%", "stop-color": "#5077f3" });
  var stop1c = fastn("stop:svg", { offset: "95%", "stop-color": "#5077f3" });
  var stop1d = fastn("stop:svg", { offset: "100%", "stop-color": "#ffffff" });

  var stop2a = fastn("stop:svg", { offset: "15%", "stop-color": "#000000" });
  var stop2b = fastn("stop:svg", { offset: "90%", "stop-color": "#ffb83c" });
  var stop2c = fastn("stop:svg", { offset: "97%", "stop-color": "#ffb83c" });
  var stop2d = fastn("stop:svg", { offset: "100%", "stop-color": "#ffffff" });

  var gradient1 = fastn(
    "linearGradient:svg",
    {
      id: "gradient",
      x1: "0%",
      x1: "0%",
      y1: "0%",
      x2: "100%",
      y2: "0%"
    },
    stop1a,
    stop1b,
    stop1c,
    stop1d
  );
  var gradient2 = fastn(
    "linearGradient:svg",
    {
      id: "gradient2",
      x1: "0%",
      x1: "0%",
      y1: "0%",
      x2: "100%",
      y2: "0%"
    },
    stop2a,
    stop2b,
    stop2c,
    stop2d
  );
  var defs = fastn("defs:svg", gradient1, gradient2);

  var animate1 = fastn("animate:svg", {
    attributeType: "XML",
    attributeName: "x",
    from: "-144",
    to: "144",
    begin: "0s",
    dur: "3s",
    repeatCount: "indefinite",
    id: "rect1-anim"
  });
  var animate2 = fastn("animate:svg", {
    attributeType: "XML",
    attributeName: "x",
    from: "-144",
    to: "144",
    begin: "0s",
    dur: "2s",
    repeatCount: "indefinite",
    id: "rect2-anim"
  });

  var rect1 = fastn(
    "rect:svg",
    {
      x: "0",
      y: "20",
      width: "128",
      height: "2",
      fill: "url('#gradient')"
    },
    animate1
  );
  var rect2 = fastn(
    "rect:svg",
    {
      x: "0",
      y: "32",
      width: "128",
      height: "2",
      fill: "url('#gradient2')"
    },
    animate2
  );

  var svg = fastn("svg", { class: "starz" }, defs, rect1, rect2);

  return fastn("div", { class: "starz-container" }, svg);
}

module.exports = function createLogo(fastn, app) {
  var starField = LogoStarField(fastn, app);
  var logo = fastn(
    "div",
    { class: "logo" },
    fastn("div", { class: "logo-text" }, "Pocket Dimension")
  ).on("click", app.getAll);
  return fastn("div", { class: "logo-container" }, starField, logo);
};
