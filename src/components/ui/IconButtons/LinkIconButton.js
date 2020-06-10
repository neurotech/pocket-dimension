import React from "react";
import styled from "styled-components";
import Button from "./Button.js";
import Icon from "./Icon.js";
import ChainIcon from "heroicons/solid/link.svg";

const LinkIcon = styled(Icon)`
  border-color: ${({ theme }) => theme.linkIconButtonBorder};
  background-color: ${({ theme }) => theme.linkIconButtonBackground};
  &:hover {
    background-color: ${({ theme }) => theme.linkIconButtonBackgroundHover};
    color: ${({ theme }) => theme.linkIconButtonBorder};
  }
`;

const LinkIconButton = ({ onClick, children }) => {
  return (
    <div>
      <Button onClick={onClick}>
        <LinkIcon>
          <ChainIcon width={20} height={20} />
          {children}
        </LinkIcon>
      </Button>
    </div>
  );
};

export default LinkIconButton;
