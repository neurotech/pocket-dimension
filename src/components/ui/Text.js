import React from "react";
import styled from "styled-components";

const resolveSizeToFontSize = (size, fontSize) => {
  switch (size) {
    case "small":
      return fontSize * 0.8 + "px";

    case "regular":
      return fontSize + "px";

    case "large":
      return fontSize * 1.25 + "px";

    case "xlarge":
      return fontSize * 1.5 + "px";

    default:
      return fontSize + "px";
  }
};
const resolveVariantToFontColour = (theme, variant) => {
  switch (variant) {
    case "normal":
      return theme.palette.text;

    case "subtitle":
      return theme.palette.subTitle;

    case "heading":
      return theme.palette.heading;

    default:
      return theme.palette.text;
  }
};

const StyledText = styled.div`
  font-size: ${({ size, theme }) =>
    resolveSizeToFontSize(size, theme.fontSize)};
  font-weight: ${(props) => props.weight};
  color: ${({ theme, variant }) => resolveVariantToFontColour(theme, variant)};
  cursor: ${(props) => props.cursor};
`;

const Text = ({
  cursor = "default",
  size = "regular",
  variant = "normal",
  weight = "normal",
  children,
}) => {
  return (
    <StyledText
      cursor={cursor}
      size={size}
      variant={variant}
      weight={weight}
      children={children}
    />
  );
};

export default Text;
