import React, { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 0;
`;

const StarField = () => {
  useEffect(() => {
    var stars = [];
    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var ctx = canvas.getContext("2d");

    ctx.imageSmoothingEnabled = false;

    function getOpacity(width) {
      if (width <= 25) {
        return 80;
      }

      if (width <= 50 && width > 25) {
        return 87;
      }

      if (width <= 75 && width > 50) {
        return 95;
      }

      if (width <= 150 && width > 75) {
        return "FF";
      }
    }

    function generateGradient(x, y, width) {
      var opacity = getOpacity(Math.round(width));
      var endGradient = x + width;
      var gradient = ctx.createLinearGradient(x, y, endGradient, y);

      gradient.addColorStop(0, "#00000000");
      gradient.addColorStop(0.2, `#F23A55${opacity}`);
      gradient.addColorStop(0.35, `#F5BE58${opacity}`);
      gradient.addColorStop(0.5, `#3ECF8E${opacity}`);
      gradient.addColorStop(0.65, `#45B2E8${opacity}`);
      gradient.addColorStop(0.8, `#7795F8${opacity}`);
      gradient.addColorStop(1, "#00000000");

      return gradient;
    }

    function drawStar() {
      ctx.fillStyle = generateGradient(this.x, this.y, this.width);
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    function despawnStar() {
      ctx.clearRect(this.x, this.y, this.width, this.height);
    }

    function generateStars() {
      var total = Math.round(Math.random() * 150);

      for (let index = 0; index < total; index++) {
        spawnStar();
      }
    }

    generateStars();

    function spawnStar() {
      var seed = Math.random();

      var starWidth = 1 + seed * 100;

      stars.push({
        x: -Math.abs(starWidth * Math.random() * 100),
        y: Math.round(Math.random() * canvasHeight),
        vx: starWidth * 0.01,
        width: starWidth,
        height: 1,
        draw: drawStar,
        despawn: despawnStar,
      });
    }

    function draw() {
      var starsToSpawn = 0;
      var starsToRemove = [];
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      stars.forEach((star) => {
        star.draw();

        var starIsOffscreen = star.x + star.vx > canvasWidth + star.width;

        if (starIsOffscreen) {
          starsToSpawn += Math.round(Math.random() * 10);
          starsToRemove.push(star);
        } else {
          star.x += star.vx;
        }
      });

      if (starsToRemove.length > 0) {
        starsToRemove.forEach((star) => {
          star.despawn();
          stars.splice(stars.indexOf(star), 1);
        });
      }

      if (starsToSpawn > 0) {
        for (let index = 0; index < starsToSpawn; index++) {
          var diceroll = Math.round(Math.random() * 6);
          if (diceroll > 4) spawnStar();
        }
      }

      window.requestAnimationFrame(draw);
    }

    draw();
  }, []);

  return (
    <Container>
      <canvas id="canvas" />
    </Container>
  );
};

export default StarField;
