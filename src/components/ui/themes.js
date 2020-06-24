const borderRadius = "0.33rem";
const borderWidth = 2;
const buttonPadding = 1;
const cardPadding = "1rem";
const codePadding = "2px 4px";
const controlBarPadding = "16px";
const fontFamily =
  "-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji";
const fontSize = 12;
const iconButtonPadding = "0.5rem";
const inputPadding = "0.5rem";
const lineHeight = 25;
const linkPadding = "2px 1px";
const loginFormInputPadding = "0.65em";
const loginFormPadding = "1em";
const moreButtonBorderWidth = 2;
const moreButtonHoverTranslateY = "-0.5rem";
const moreButtonMargin = "1rem";
const moreButtonPadding = "1rem";
const searchBarPadding = "0.6rem";
const subTitleTextSize = "0.5rem";

const listMargin = "2rem";

const commonPalette = {
  lightskyblue: "#91cdff",
  skyblue: "#65b8ff",
  darkskyblue: "#2271b5",
  palepink: "#ffdbef",
  lightpink: "#ff66ba",
  pink: "#ff008b",
  darkpink: "#b30062",
  darkerpink: "#54002e",
  paleblue: "#b8c8f9",
  lightblue: "#6b8bf5",
  blue: "#5077f3",
  darkblue: "#234097",
  dimblue: "#4c5d90",
  heavyblue: "#0a1c4c",
  lightred: "#fb5083",
  red: "#fa1459",
  darkred: "#b10d3e",
  paleyellow: "#fff2c7",
  lightyellow: "#ffc561",
  yellow: "#ffb83c",
  darkyellow: "#ad7719",
  brightyellow: "#ffd500",
  lightgreen: "#46c3aa",
  green: "#00b894",
  darkgreen: "#006b55",
  lightorange: "#ff808c",
  orange: "#ff5161",
  darkorange: "#a21b29",
  lightpurple: "#9fa2f9",
  purple: "#8386f5",
  darkpurple: "#4d51d1",

  white: "#ffffff",
  black: "#131315",

  palegray: "#e8e8e8",
  lightgray: "#d4d4d4",
  gray: "#a8a8a8",
  darkgray: "#737373",

  darkcharcoal: "#191b1f",
  charcoal: "#212328",
  lightcharcoal: "#32333e",
  palecharcoal: "#4d4e5f",

  ash: "#676877",
  lightash: "#9ea0b3",
  paleash: "#d3d5ec",
  brightash: "#e5e6f5",

  smoke: "rgba(19, 19, 21, 0.7)
  trueblack: "#000000
};

const darkPalette = {
  bodyBackground: commonPalette.charcoal,
  boxBackground: commonPalette.lightcharcoal,
  boxBorder: commonPalette.black,
  divider: commonPalette.charcoal,
  link: commonPalette.brightyellow,
  linkBackgroundHover: commonPalette.brightyellow,
  linkHover: commonPalette.black,
  subTitle: commonPalette.lightash,
  text: commonPalette.paleash,
  heading: commonPalette.brightash,
  iconBorder: commonPalette.charcoal,
  iconBackground: commonPalette.palecharcoal,
  iconText: commonPalette.charcoal,
  codeBackground: commonPalette.palecharcoal,
  codeText: commonPalette.paleash,
  searchBarBorder: commonPalette.black,
  searchBarBackground: commonPalette.charcoal,
  searchBarPlaceholder: commonPalette.ash,
  indicator: commonPalette.paleash,
  moreButtonBorder: commonPalette.black,
  moreButtonBackground: commonPalette.palecharcoal,
  moreButtonText: commonPalette.lightcharcoal,
  itemDialogBorder: commonPalette.black,
  itemDialogBackground: commonPalette.lightcharcoal,
  typeButtonBorder: commonPalette.charcoal,
  typeButtonBackground: commonPalette.ash,
  typeButtonText: commonPalette.charcoal,
  inputBorder: commonPalette.charcoal,
  inputBackground: commonPalette.palecharcoal,
  inputText: commonPalette.paleash,
  inputPlaceholder: commonPalette.lightash,
  inputBorderFocus: commonPalette.blue,
  disabledInputBorder: commonPalette.charcoal,
  disabledInputBackground: commonPalette.palecharcoal,
  disabledInputText: commonPalette.charcoal,
  codeBlockBorder: commonPalette.darkcharcoal,
};

const lightPalette = {
  boxBorder: commonPalette.gray,
  boxBackground: commonPalette.white,
  bodyBackground: commonPalette.palegray,
  link: commonPalette.pink,
  linkBackgroundHover: commonPalette.pink,
  linkHover: commonPalette.white,
  text: commonPalette.black,
  subTitle: commonPalette.darkgray,
  heading: commonPalette.black,
  divider: commonPalette.palegray,
  iconBorder: commonPalette.gray,
  iconBackground: commonPalette.lightgray,
  iconText: commonPalette.gray,
  codeBackground: commonPalette.paleyellow,
  codeText: commonPalette.black,
  searchBarBorder: commonPalette.gray,
  searchBarBackground: commonPalette.palegray,
  searchBarPlaceholder: commonPalette.gray,
  indicator: commonPalette.darkgray,
  moreButtonBorder: commonPalette.gray,
  moreButtonBackground: commonPalette.lightgray,
  moreButtonText: commonPalette.gray,
  itemDialogBorder: commonPalette.darkgray,
  itemDialogBackground: commonPalette.white,
  typeButtonBorder: commonPalette.lightgray,
  typeButtonBackground: commonPalette.palegray,
  typeButtonText: commonPalette.gray,
  inputBorder: commonPalette.darkgray,
  inputBackground: commonPalette.white,
  inputText: commonPalette.black,
  inputPlaceholder: commonPalette.gray,
  inputBorderFocus: commonPalette.blue,
  disabledInputBorder: commonPalette.darkgray,
  disabledInputBackground: commonPalette.lightgray,
  disabledInputText: commonPalette.darkgray,
  codeBlockBorder: commonPalette.lightgray,
};

const light = {
  palette: lightPalette,
  bodyBackground: lightPalette.bodyBackground,
  borderRadius,
  borderWidth,
  buttonPadding,
  cardPadding,
  codePadding,
  commonPalette,
  controlBarPadding,
  fontFamily,
  fontSize,
  iconButtonPadding,
  inputPadding,
  lineHeight,
  linkPadding,
  loginFormInputPadding,
  loginFormPadding,
  moreButtonBorderWidth,
  moreButtonHoverTranslateY,
  moreButtonMargin,
  moreButtonPadding,
  searchBarPadding,
  subTitleTextSize,
  linkBackgroundHover: commonPalette.pink,
  linkForeground: commonPalette.pink,
  linkForegroundHover: commonPalette.white,
  listMargin,
};

const dark = {
  palette: darkPalette,
  bodyBackground: darkPalette.bodyBackground,
  borderRadius,
  borderWidth,
  buttonPadding,
  cardPadding,
  codePadding,
  commonPalette,
  controlBarPadding,
  fontFamily,
  fontSize,
  iconButtonPadding,
  inputPadding,
  lineHeight,
  linkPadding,
  loginFormInputPadding,
  loginFormPadding,
  moreButtonBorderWidth,
  moreButtonHoverTranslateY,
  moreButtonMargin,
  moreButtonPadding,
  searchBarPadding,
  subTitleTextSize,
  listMargin,
};

export default { light, dark };
