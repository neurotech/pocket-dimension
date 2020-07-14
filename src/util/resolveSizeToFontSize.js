const resolveSizeToFontSize = (size) => {
  switch (size) {
    case "xsmall":
      return "8px";

    case "small":
      return "10px";

    case "normal":
      return "12px";

    case "large":
      return "14px";

    case "xlarge":
      return "16px";

    default:
      return "12px";
  }
};

export default resolveSizeToFontSize;
