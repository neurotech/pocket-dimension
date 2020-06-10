const fontFamily =
  "-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji";
const fontSize = 12;
const lineHeight = 25;
const borderWidth = 2;

const buttonBorderRadius = "0.33rem";
const codeBorderRadius = "0.33rem";
const cardBorderRadius = "0.33rem";
const searchBarBorderRadius = "0.33rem";
const linkBackgroundBorderRadius = "0.33rem";

const buttonPadding = "0.5rem";
const cardPadding = "1rem";
const controlBarPadding = "16px";
const searchBarPadding = "0.6rem";
const iconButtonPadding = "0.5rem";
const codePadding = "2px 4px";
const linkPadding = "2px 1px";

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
  paleyellow: "#fff2c7",
  lightyellow: "#ffc561",
  yellow: "rgb(255, 184, 60)",
  darkyellow: "#ad7719",
  lightgreen: "#46c3aa",
  green: "rgb(0, 184, 148)",
  darkgreen: "#006b55",
  lightorange: "#ff808c",
  orange: "#ff5161",
  darkorange: "#d12335",
  lightpurple: "#9fa2f9",
  purple: "#8386f5",
  darkpurple: "#4d51d1",
  white: "rgb(255,255,255)",
  black: "rgb(5,5,5)",
  palegray: "#e8e8e8",
  lightgray: "#d4d4d4",
  gray: "#a8a8a8",
  darkgray: "#737373",
};

const light = {
  fontSize,
  lineHeight,
  linkBackgroundHover: lightPalette.pink,
  linkForeground: lightPalette.pink,
  linkForegroundHover: lightPalette.white,
  linkBackgroundBorderRadius,
  bodyBackgroundColour: lightPalette.palegray,
  borderWidth,
  buttonBorder: lightPalette.darkpink,
  buttonBackground: lightPalette.pink,
  buttonBackgroundHover: lightPalette.lightpink,
  buttonText: lightPalette.white,
  buttonTextHover: lightPalette.darkpink,
  buttonBorderRadius,
  buttonPadding,
  cardBackgroundColour: lightPalette.white,
  cardBorder: lightPalette.lightgray,
  cardBorderRadius,
  cardPadding,
  codeBackground: lightPalette.paleyellow,
  codeBorderRadius,
  controlBarBorderBottomColour: lightPalette.lightgray,
  controlBarBackgroundColour: lightPalette.white,
  controlBarPadding,
  dividerBackground: lightPalette.palegray,
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

  codePadding,
  linkPadding,

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

  createIconButtonBorder: lightPalette.darkpurple,
  createIconButtonBackground: lightPalette.purple,
  createIconButtonBackgroundHover: lightPalette.lightpurple,

  logoutIconButtonBorder: lightPalette.darkred,
  logoutIconButtonBackground: lightPalette.red,
  logoutIconButtonBackgroundHover: lightPalette.lightred,

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

const dark = { bodyBackgroundColour: "black" };

export default { light, dark };
