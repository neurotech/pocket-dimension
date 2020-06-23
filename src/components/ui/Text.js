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

    default:
      return fontSize + "px";
  }
};

const StyledText = styled.div`
  font-size: ${({ size, theme }) =>
    resolveSizeToFontSize(size, theme.fontSize)};
  font-weight: ${(props) => props.weight};
  color: ${({ subtitle, theme }) =>
    subtitle ? theme.palette.subTitle : theme.palette.text};
`;

const Text = ({
  size = "regular",
  weight = "normal",
  subtitle = false,
  children,
}) => {
  return (
    <StyledText size={size} weight={weight} subtitle={subtitle}>
      {children}
    </StyledText>
  );
};

export default Text;
