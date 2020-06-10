import React from "react";
import styled from "styled-components";
import Button from "./Button.js";
import Icon from "./Icon.js";
import BoxIcon from "heroicons/solid/archive.svg";

const ArchiveIcon = styled(Icon)`
  color: ${({ theme }) => theme.iconButtonBorder};
  &:hover {
    border-color: ${({ theme }) => theme.archiveIconButtonBorderHover};
    background-color: ${({ theme }) => theme.archiveIconButtonBackgroundHover};
    color: ${({ theme }) => theme.archiveIconButtonTextHover};
  }
`;

const ArchiveIconButton = ({ onClick }) => {
  return (
    <div>
      <Button onClick={onClick}>
        <ArchiveIcon>
          <BoxIcon width={20} height={20} />
        </ArchiveIcon>
      </Button>
    </div>
  );
};

export default ArchiveIconButton;
