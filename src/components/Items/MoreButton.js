import React from "react";
import styled, { css, keyframes } from "styled-components";
import DownArrowIcon from "heroicons/solid/arrow-circle-down.svg";

const pulseKeyframes = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0.5;
  }
`;

const pulseMixin = css`
  animation-name: ${pulseKeyframes};
  animation-duration: 1.75s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
`;

const StyledButton = styled.button`
  ${pulseMixin};
  outline: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.fontSize}px;
  font-weight: 600;
  border-style: solid;
  line-height: 0;
  border-radius: ${({ theme }) => theme.buttonBorderRadius};
  border-width: ${({ theme }) => theme.moreButtonBorderWidth}px;
  border-color: ${({ theme }) => theme.moreButtonBorder};
  background: ${({ theme }) => theme.moreButtonBackground};
  color: ${({ theme }) => theme.moreButtonText};
  padding-right: 0;
  padding-left: 0;
  padding-top: ${({ theme }) => theme.moreButtonPadding};
  padding-bottom: ${({ theme }) => theme.moreButtonPadding};
  margin: 0 ${({ theme }) => theme.moreButtonMargin};
  flex-grow: 1;
  transition: transform 0.15s, border-color 0.15s, background-color 0.15s,
    color 0.15s;

  &:hover {
    animation: none;
    transform: translateY(${({ theme }) => theme.moreButtonHoverTranslateY});
    border-color: ${({ theme }) => theme.moreButtonBorderHover};
    background: ${({ theme }) => theme.moreButtonBackgroundHover};
    color: ${({ theme }) => theme.moreButtonTextHover};
  }
`;

const MoreButton = ({ onClick }) => {
  return (
    <div style={{ display: "flex" }}>
      <StyledButton onClick={onClick}>
        <DownArrowIcon width={40} height={40} />
        <DownArrowIcon width={40} height={40} />
        <DownArrowIcon width={40} height={40} />
      </StyledButton>
    </div>
  );
};

export default MoreButton;
