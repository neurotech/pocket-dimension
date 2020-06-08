const fontFamily =
  "-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji";
const fontSize = 12;
const borderWidth = 2;

const buttonPadding = "0.5rem";
const buttonBorderRadius = "0.33rem";
const cardPadding = "1rem";
const cardBorderRadius = "0.33rem";
const controlBarPadding = "16px";
const searchBarPadding = "0.6rem";
const searchBarBorderRadius = "0.33rem";
const iconButtonPadding = "0.5rem";

const subTitleTextSize = "0.5rem";

const lightPalette = {
  palepink: "#ffdbef",
  lightpink: "#ff66ba",
  pink: "rgb(255, 0, 139)",
  darkpink: "#b30062",
  darkerpink: "#54002e",
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
  lightorange: "#ff808c",
  orange: "#ff5161",
  darkorange: "#d12335",
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
  linkForeground: lightPalette.pink,
  bodyBackgroundColour: lightPalette.palegray,
  borderWidth,
  buttonBackgroundColour: lightPalette.white,
  buttonBorderRadius,
  buttonTextColour: lightPalette.black,
  buttonPadding,
  cardBackgroundColour: lightPalette.white,
  cardBorder: lightPalette.lightgray,
  cardBorderRadius,
  cardPadding,
  controlBarBorderBottomColour: lightPalette.lightgray,
  controlBarBackgroundColour: lightPalette.white,
  controlBarPadding,
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

  allIconButtonBorder: lightPalette.darkorange,
  allIconButtonBackground: lightPalette.orange,
  allIconButtonBackgroundHover: lightPalette.lightorange,
  allIconButtonText: lightPalette.white,
  allIconButtonTextHover: lightPalette.darkorange,

  refreshIconButtonBackground: lightPalette.pink,
  refreshIconButtonBackgroundHover: lightPalette.lightpink,
  refreshIconButtonBorder: lightPalette.darkpink,
  refreshIconButtonBorderHover: lightPalette.darkpink,
  refreshIconButtonText: lightPalette.white,
  refreshIconButtonTextHover: lightPalette.darkpink,

  iconButtonText: lightPalette.white,
  iconButtonPadding,

  subTitleTextSize,
  subtitleTextColour: lightPalette.darkgray,
  textColour: lightPalette.black,

  arrowIndicatorColor: lightPalette.darkgray,

  selectionBackground: lightPalette.pink,
  selectionForeground: lightPalette.white,

  searchBarPadding,
  searchBarBorderRadius,
  searchBarBorderColour: lightPalette.gray,
  searchBarBackgroundColour: lightPalette.palegray,
  searchBarTextPlaceholder: lightPalette.gray,
  searchBarTextFocus: lightPalette.darkpink,
  searchBarBorderFocus: lightPalette.pink,
  searchBarBackgroundFocus: lightPalette.palepink,
};

const dark = {
  // TODO
};

export default { light };
