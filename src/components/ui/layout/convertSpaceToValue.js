const convertSpaceToValue = (space) => {
  switch (space) {
    case "none":
      return "0";

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

export default convertSpaceToValue;
