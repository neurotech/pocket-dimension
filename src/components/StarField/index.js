function getRandomColour() {
  const palette = [
    "rgb(80, 119, 243)",
    "rgb(60, 96, 209)",
    "rgb(255, 0, 139)",
    "rgb(250, 20, 89)",
    "rgb(255, 240, 33)",
    "rgb(255, 115, 0)",
    "rgb(255, 149, 61)",
    "rgb(144, 255, 93)",
    "rgb(43, 255, 191)",
    "rgb(0, 184, 148)",
    "rgb(162, 155, 254)",
    "rgb(108, 92, 231)"
  ];
  return palette[Math.floor(Math.random() * palette.length)];
}

function getRandomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function generateStarfield(numStars) {
  var stars = [];
  for (var i = 1; i < numStars; i++) {
    stars.push({ id: i });
  }
  return stars;
}

function spawnStar(fastn, app) {
  var starTravelTime = getRandomInt(2, 22);

  // The lower the starTravelTime, the longer the trail
  // var trailLength = starTravelTime * getRandomInt(3, 5);
  var trailLength = (1 / starTravelTime) * getRandomInt(40, 100);

  var starHeight = 1;
  var star = fastn("div", {
    class: "star",
    style: {
      background: "white",
      height: `${starHeight}px`
    }
  });
  var trail = fastn("div", {
    class: "trail",
    style: {
      opacity: getRandomInt(25, 100) / 100,
      background: `linear-gradient(to right, rgba(0, 0, 0, 0) 0%, ${getRandomColour()} ${getRandomInt(
        75,
        100
      )}%)`,
      width: trailLength + "px",
      height: `${starHeight}px`
    }
  });

  return fastn(
    "div",
    {
      class: "star-container",
      style: {
        "animation-delay": "0ms, " + getRandomInt(50, 1000) + "ms",
        "animation-duration": getRandomInt(3, 10) + "s, " + starTravelTime + "s",
        top: getRandomInt(5, 95) + "%"
      }
    },
    star,
    trail
  );
}

module.exports = function createStarField(fastn, app) {
  var numStars = getRandomInt(24, 64);
  var stars = generateStarfield(numStars);

  var starfield = fastn("list", {
    insertionFrameTime: 30,
    items: stars,
    class: "starfield",
    template: function() {
      return spawnStar(fastn, app);
    }
  });

  return starfield;
};
