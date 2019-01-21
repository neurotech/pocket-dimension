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

function spawnStar(fastn, app) {
  var starTravelTime = getRandomInt(2, 22);
  var scaler = 1 / starTravelTime;
  var trailLength = scaler * getRandomInt(40, 100);
  var starHeight = scaler * 10 < 1 ? 1 : 2;

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
      background: `linear-gradient(to left, rgba(0, 0, 0, 0) 0%, ${getRandomColour()} ${getRandomInt(
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
        opacity: (1 / starTravelTime) * 3,
        "animation-delay": getRandomInt(50, 1000) + "ms",
        "animation-duration": starTravelTime + "s",
        top: getRandomInt(2, 98) + "%"
      }
    },
    star,
    trail
  );
}

function addStars(fastn, stars, numberToAdd){
  for(var i = 0; i < numberToAdd; i++){
    fastn.Model.push(stars, { id: stars.length });
  }
}

function addMoreStars(fastn, stars){
  var numberToAdd = Math.floor(stars.length / 5);
  addStars(fastn, stars, numberToAdd);
}

module.exports = function createStarField(fastn, app) {
  var numStars = getRandomInt(48, 64);
  var stars = [];

  addStars(fastn, stars, 50);

  var starfield = fastn("list", {
    insertionFrameTime: 30,
    items: fastn.binding('.|*'),
    class: "starfield",
    template: function() {
      return spawnStar(fastn, app);
    }
  },
    fastn('button', { class: 'addStars' }, 'Add stars')
    .on('click', () => addMoreStars(fastn, stars))
  )
  .attach(stars);

  return starfield;
};
