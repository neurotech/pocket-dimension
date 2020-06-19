import React from "react";
import styled from "styled-components";
import Button from "./Button.js";
import Icon from "./Icon.js";
import ExitIcon from "heroicons/solid/logout.svg";

const LogoutIcon = styled(Icon)`
  border-color: ${({ theme }) => theme.commonPalette.darkred};
  background-color: ${({ theme }) => theme.commonPalette.red};
  color: ${({ theme }) => theme.commonPalette.white};

  &:hover {
    background-color: ${({ theme }) => theme.commonPalette.lightred};
    color: ${({ theme }) => theme.commonPalette.darkred};
  }
  & svg {
    transform: scaleX(-1);
  }
`;

const LogoutIconButton = ({ onClick }) => {
  return (
    <div>
      <Button onClick={onClick}>
        <LogoutIcon>
          <ExitIcon width={20} height={20} />
        </LogoutIcon>
      </Button>
    </div>
  );
};

export default LogoutIconButton;
