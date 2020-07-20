import React from "react";
import styled from "styled-components";
import Button from "./Button.js";
import Icon from "./Icon.js";
import ChainIcon from "heroicons/solid/link.svg";

const ExpandLinkItemIcon = styled(Icon)`
  padding: 0.4rem;
  border-color: ${({ theme }) => theme.commonPalette.darkgreen};
  background-color: ${({ theme }) => theme.commonPalette.green};
  color: ${({ theme }) => theme.commonPalette.white};
  &:hover {
    background-color: ${({ theme }) => theme.commonPalette.green};
    color: ${({ theme }) => theme.commonPalette.white};
    cursor: default;
  }
`;

const ExpandLinkItemButton = () => {
  return (
    <Button>
      <ExpandLinkItemIcon>
        <ChainIcon width={16} height={16} />
      </ExpandLinkItemIcon>
    </Button>
  );
};

export default ExpandLinkItemButton;
