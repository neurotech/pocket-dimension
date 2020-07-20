import React from "react";
import styled from "styled-components";
import Button from "./Button.js";
import Icon from "./Icon.js";
import RightIcon from "heroicons/solid/arrow-circle-right.svg";
import DownIcon from "heroicons/solid/arrow-circle-down.svg";

const ExpandNoteItemIcon = styled(Icon)`
  padding: 0.4rem;
  border-color: ${({ theme }) => theme.commonPalette.darkblue};
  background-color: ${({ theme }) => theme.commonPalette.blue};
  color: ${({ theme }) => theme.commonPalette.white};
  &:hover {
    background-color: ${({ theme }) => theme.commonPalette.lightblue};
    color: ${({ theme }) => theme.commonPalette.darkblue};
  }
`;

const ExpandNoteItemButton = ({ expanded, toggleExpanded }) => {
  return (
    <Button title={"Expand this Note item"} onClick={toggleExpanded}>
      <ExpandNoteItemIcon>
        {expanded ? (
          <DownIcon width={16} height={16} />
        ) : (
          <RightIcon width={16} height={16} />
        )}
      </ExpandNoteItemIcon>
    </Button>
  );
};

export default ExpandNoteItemButton;
