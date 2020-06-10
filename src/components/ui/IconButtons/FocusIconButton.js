import React from "react";
import styled from "styled-components";
import Button from "./Button.js";
import Icon from "./Icon.js";
import EyeIcon from "heroicons/solid/eye.svg";

const FocusIcon = styled(Icon)`
  color: ${({ theme }) => theme.iconButtonBorder};
  &:hover {
    border-color: ${({ theme }) => theme.focusIconButtonBorderHover};
    background-color: ${({ theme }) => theme.focusIconButtonBackgroundHover};
    color: ${({ theme }) => theme.focusIconButtonTextHover};
  }
`;

const FocusIconButton = ({ onClick }) => {
  return (
    <div>
      <Button onClick={onClick}>
        <FocusIcon>
          <EyeIcon width={20} height={20} />
        </FocusIcon>
      </Button>
    </div>
  );
};

export default FocusIconButton;
