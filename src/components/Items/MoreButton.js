import React from "react";
import styled from "styled-components";
import DownArrowIcon from "heroicons/solid/arrow-circle-down.svg";

const StyledButton = styled.button`
  outline: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.fontSize}px;
  font-weight: 600;
  border-style: solid;
  line-height: 0;
  border-radius: ${({ theme }) => theme.borderRadius};
  border-width: ${({ theme }) => theme.moreButtonBorderWidth}px;

  border-color: ${({ theme }) => theme.palette.moreButtonBorder};
  background: ${({ theme }) => theme.palette.moreButtonBackground};
  color: ${({ theme }) => theme.palette.moreButtonText};

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
    border-color: ${({ theme }) => theme.commonPalette.darkyellow};
    background: ${({ theme }) => theme.commonPalette.yellow};
    color: ${({ theme }) => theme.commonPalette.white};
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
