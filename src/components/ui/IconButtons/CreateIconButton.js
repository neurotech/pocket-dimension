import React from "react";
import styled from "styled-components";
import Button from "./Button.js";
import Icon from "./Icon.js";
import AddIcon from "heroicons/solid/document-add.svg";

const CreateIcon = styled(Icon)`
  border-color: ${({ theme }) => theme.commonPalette.darkpurple};
  background-color: ${({ theme }) => theme.commonPalette.purple};
  color: ${({ theme }) => theme.commonPalette.white};

  &:hover {
    background-color: ${({ theme }) => theme.commonPalette.lightpurple};
    color: ${({ theme }) => theme.commonPalette.darkpurple};
  }
`;

const CreateIconButton = ({ onClick }) => {
  return (
    <Button title={"Create a new item"} onClick={onClick}>
      <CreateIcon>
        <AddIcon width={20} height={20} />
      </CreateIcon>
    </Button>
  );
};

export default CreateIconButton;
