const palette = ["#5077f3"];

function getRandomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function generateStarfield(numStars) {
  var stars = [];

  // Do CSS here

  for (var i = 1; i < numStars; i++) {
    stars.push({ id: i });
  }

  return stars;
}

function spawnStar(fastn, app) {
  var colour = palette[Math.floor(Math.random() * palette.length)];

  var css = fastn.binding("item.id", item => {
    return `.star-${item.id}:before {
      width: ${getRandomInt(50, 300)}px;
      background: linear-gradient(to right, #000000 0%,${colour} 100%);
    }`;
  });

  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  style.appendChild(document.createTextNode(css));
  head.appendChild(style);

  return fastn("div", {
    class: [
      "star",
      fastn.binding("item.id", id => {
        return `star-${id}`;
      })
    ],
    style: {
      "background-color": colour,
      "animation-duration": getRandomInt(2, 10) + "s",
      top: getRandomInt(10, 90) + "%"
    }
  });
}

module.exports = function createStarField(fastn, app) {
  var numStars = getRandomInt(6, 12);
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
