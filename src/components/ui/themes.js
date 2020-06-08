const fontFamily =
  "-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji";
const fontSize = 12;

const buttonPadding = "0.5rem";
const buttonBorderRadius = "0.33rem";
const cardPadding = "1rem";
const cardBorderRadius = "0.33rem";
const iconButtonPadding = "0.5rem";

const subTitleTextSize = "0.5rem";

const lightPalette = {
  pink: "rgb(255, 0, 139)",
  lightblue: "#6b8bf5",
  blue: "rgb(80, 119, 243)",
  darkblue: "#234097",
  lightred: "#fb5083",
  red: "rgb(250, 20, 89)",
  darkred: "#c01145",
  lightyellow: "#ffc561",
  yellow: "rgb(255, 184, 60)",
  darkyellow: "#ad7719",
  lightgreen: "#46c3aa",
  green: "rgb(0, 184, 148)",
  darkgreen: "#006b55",
  purple: "rgb(162, 155, 254)",
  white: "rgb(255,255,255)",
  black: "rgb(5,5,5)",
  palegray: "#e8e8e8",
  lightgray: "#d4d4d4",
  gray: "#a8a8a8",
  darkgray: "#737373",
};

const light = {
  fontSize,
  bodyBackgroundColour: lightPalette.palegray,
  buttonBackgroundColour: lightPalette.white,
  buttonBorderRadius,
  buttonTextColour: lightPalette.black,
  buttonPadding,
  cardBackgroundColour: lightPalette.white,
  cardBorder: lightPalette.lightgray,
  cardBorderRadius,
  cardPadding,
  controlBarBackgroundColour: lightPalette.pink,
  fontFamily,
  noteIconButtonBorder: lightPalette.darkblue,
  noteIconButtonBackground: lightPalette.blue,
  noteIconButtonBackgroundHover: lightPalette.lightblue,
  linkIconButtonBorder: lightPalette.darkgreen,
  linkIconButtonBackground: lightPalette.green,
  linkIconButtonBackgroundHover: lightPalette.lightgreen,
  diaryIconButtonBorder: lightPalette.darkyellow,
  diaryIconButtonBackground: lightPalette.yellow,
  diaryIconButtonBackgroundHover: lightPalette.lightyellow,

  iconButtonBorder: lightPalette.gray,
  iconButtonBackground: lightPalette.lightgray,
  iconButtonBackgroundHover: lightPalette.palegray,

  focusIconButtonBorderHover: lightPalette.darkblue,
  focusIconButtonBackgroundHover: lightPalette.blue,
  focusIconButtonTextHover: lightPalette.white,

  archiveIconButtonBorderHover: lightPalette.darkyellow,
  archiveIconButtonBackgroundHover: lightPalette.yellow,
  archiveIconButtonTextHover: lightPalette.white,

  deleteIconButtonBorderHover: lightPalette.darkred,
  deleteIconButtonBackgroundHover: lightPalette.red,
  deleteIconButtonTextHover: lightPalette.white,

  iconButtonText: lightPalette.white,
  iconButtonPadding,

  subTitleTextSize,
  subtitleTextColour: lightPalette.darkgray,
  textColour: lightPalette.black,
};

const dark = {
  // TODO
};

export default { light };
