import React from "react";
import styled, { keyframes, css } from "styled-components";
import Button from "./Button.js";
import Icon from "./Icon.js";
import DoubleArrowsIcon from "heroicons/solid/refresh.svg";

const rotate = keyframes`
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0deg);
  }
`;

const rotationMixin = css`
  animation: ${rotate} 2s linear infinite;
`;

const RefreshIcon = styled(Icon)`
  background-color: ${({ theme }) => theme.refreshIconButtonBackground};
  border-color: ${({ theme }) => theme.refreshIconButtonBorder};
  color: ${({ theme }) => theme.refreshIconButtonText};
  &:hover {
    border-color: ${({ theme }) => theme.refreshIconButtonBorderHover};
    background-color: ${({ theme }) => theme.refreshIconButtonBackgroundHover};
    color: ${({ theme }) => theme.refreshIconButtonTextHover};
  }
  & svg {
    ${(props) => (props.isLoading ? rotationMixin : "animation: none")};
  }
`;

const RefreshIconButton = ({ onClick, isLoading }) => {
  return (
    <div>
      <Button onClick={onClick}>
        <RefreshIcon isLoading={isLoading}>
          <DoubleArrowsIcon width={20} height={20} />
        </RefreshIcon>
      </Button>
    </div>
  );
};

export default RefreshIconButton;
