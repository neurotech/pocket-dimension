import React from "react";
import styled from "styled-components";
import Button from "./Button.js";
import Icon from "./Icon.js";
import HomeIcon from "heroicons/solid/home.svg";

const AllIcon = styled(Icon)`
  border-color: ${({ theme }) => theme.allIconButtonBorder};
  background-color: ${({ theme }) => theme.allIconButtonBackground};
  &:hover {
    background-color: ${({ theme }) => theme.allIconButtonBackgroundHover};
    color: ${({ theme }) => theme.allIconButtonBorder};
  }
`;

const AllIconButton = ({ onClick, children }) => {
  return (
    <div>
      <Button onClick={onClick}>
        <AllIcon>
          <HomeIcon width={20} height={20} />
          {children}
        </AllIcon>
      </Button>
    </div>
  );
};

export default AllIconButton;
