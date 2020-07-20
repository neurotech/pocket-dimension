import React from "react";
import styled from "styled-components";
import Button from "./Button.js";
import Icon from "./Icon.js";
import RightIcon from "heroicons/solid/arrow-circle-right.svg";
import DownIcon from "heroicons/solid/arrow-circle-down.svg";

const ExpandDiaryItemIcon = styled(Icon)`
  padding: 0.4rem;
  border-color: ${({ theme }) => theme.commonPalette.darkyellow};
  background-color: ${({ theme }) => theme.commonPalette.yellow};
  color: ${({ theme }) => theme.commonPalette.white};
  &:hover {
    background-color: ${({ theme }) => theme.commonPalette.lightyellow};
    color: ${({ theme }) => theme.commonPalette.darkyellow};
  }
`;

const ExpandDiaryItemButton = ({ expanded, toggleExpanded }) => {
  return (
    <Button title={"Expand this Diary item"} onClick={toggleExpanded}>
      <ExpandDiaryItemIcon>
        {expanded ? (
          <DownIcon width={16} height={16} />
        ) : (
          <RightIcon width={16} height={16} />
        )}
      </ExpandDiaryItemIcon>
    </Button>
  );
};

export default ExpandDiaryItemButton;
