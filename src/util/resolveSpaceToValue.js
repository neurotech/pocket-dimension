const resolveSpaceToValue = (space) => {
  switch (space) {
    case "none":
      return "0";

    case "xxsmall":
      return "4px";

    case "xsmall":
      return "8px";

    case "small":
      return "16px";

    case "medium":
      return "32px";

    case "large":
      return "64px";

    default:
      return "0";
  }
};

export default resolveSpaceToValue;
