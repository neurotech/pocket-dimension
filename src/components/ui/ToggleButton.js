import React from "react";
import styled from "styled-components";
import SolidClockIcon from "heroicons/solid/clock.svg";
import OutlineClockIcon from "heroicons/outline/clock.svg";
import MoonIcon from "heroicons/solid/moon.svg";
import SunIcon from "heroicons/solid/sun.svg";

const StyledButton = styled.button`
  outline: none;
  cursor: pointer;
  font-family: "Segoe UI";
  font-weight: 600;
  border-style: solid;
  line-height: 0;
  padding: ${({ theme }) => theme.iconButtonPadding};
  border-radius: ${({ theme }) => theme.borderRadius};
  border-width: ${({ theme }) => theme.borderWidth}px;
  transition: border-color 0.15s, background-color 0.15s, color 0.15s;

  border-color: ${({ theme }) => theme.commonPalette.darkpink};
  background: ${({ theme }) => theme.commonPalette.pink};
  color: ${({ theme }) => theme.commonPalette.white};
`;

const DarkModeButton = styled(StyledButton)`
  border-color: ${(props) =>
    props.toggled
      ? props.theme.commonPalette.black
      : props.theme.commonPalette.darkskyblue};

  background: ${(props) =>
    props.toggled
      ? props.theme.commonPalette.charcoal
      : props.theme.commonPalette.skyblue};

  color: ${({ theme }) => theme.commonPalette.white};

  & :hover {
    border-color: ${(props) =>
      props.toggled
        ? props.theme.commonPalette.darkpurple
        : props.theme.commonPalette.darkskyblue};

    background: ${(props) =>
      props.toggled
        ? props.theme.commonPalette.lightpurple
        : props.theme.commonPalette.lightskyblue};

    color: ${(props) =>
      props.toggled
        ? props.theme.commonPalette.darkpurple
        : props.theme.commonPalette.darkskyblue};
  }
`;

const ArchiveModeButton = styled(StyledButton)`
  opacity: ${(props) => (props.toggled ? 1 : 0.33)};
  filter: ${(props) => (props.toggled ? "grayscale(0)" : "grayscale(1)")};
`;

const renderButtonByVariant = (variant, toggled, onClick, children) => {
  switch (variant) {
    case "darkMode":
      return (
        <DarkModeButton onClick={onClick} toggled={toggled}>
          {children}
        </DarkModeButton>
      );

    case "archive":
      return (
        <ArchiveModeButton onClick={onClick} toggled={toggled}>
          {children}
        </ArchiveModeButton>
      );
  }
};

const renderIconByVariant = (variant, toggled) => {
  switch (variant) {
    case "darkMode":
      return toggled ? (
        <MoonIcon width={20} height={20} />
      ) : (
        <SunIcon width={20} height={20} />
      );

    case "archive":
      return toggled ? (
        <SolidClockIcon width={20} height={20} />
      ) : (
        <OutlineClockIcon width={20} height={20} />
      );
  }
};

const ToggleButton = ({ toggled, onClick, variant }) => {
  return renderButtonByVariant(
    variant,
    toggled,
    onClick,
    renderIconByVariant(variant, toggled)
  );
};

export default ToggleButton;
