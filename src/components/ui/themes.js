const buttonPadding = "1rem";

const lightPalette = {
  pink: "rgb(255, 0, 139)",
  blue: "rgb(80, 119, 243)",
  red: "rgb(250, 20, 89)",
  yellow: "rgb(255, 184, 60)",
  green: "rgb(0, 184, 148)",
  purple: "rgb(162, 155, 254)",
  white: "rgb(255,255,255)",
};

const darkPalette = {
  black: "#080811",
  darkgray: "#262637",
  mediumgray: "#474759",
  lightgray: "#676779",
  gray: "#9292A0",
};

const light = {
  bodyBackgroundColour: lightPalette.white,
  buttonBackgroundColour: lightPalette.white,
  buttonTextColour: lightPalette.white,
  buttonPadding,
};

const dark = {
  bodyBackgroundColour: darkPalette.mediumgray,
  buttonBackgroundColour: darkPalette.mediumgray,
  buttonTextColour: darkPalette.mediumgray,
  buttonPadding,
};

export default { light, dark };
