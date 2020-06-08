import resolveSpaceToValue from "./resolveSpaceToValue";

const generateDefaultStyles = (space) => ({
  minWidth: 0,
  paddingLeft: resolveSpaceToValue(space),
  flexShrink: 0,
  flexGrow: 0,
  flexBasis: "auto",
});

const resolveColumnWidthToValue = (space, columnWidth) => {
  const styles = generateDefaultStyles(space);

  switch (columnWidth) {
    case "content":
      break;

    case "fill":
      styles.flexGrow = 1;
      break;

    case "25%":
      styles.flexBasis = "25%";
      break;

    case "50%":
      styles.flexBasis = "50%";
      break;

    case "75%":
      styles.flexBasis = "75%";
      break;

    case "100%":
      styles.flexBasis = "100%";
      break;

    default:
      break;
  }

  return styles;
};

export default resolveColumnWidthToValue;
