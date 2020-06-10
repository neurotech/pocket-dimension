import React from "react";
import styled from "styled-components";
import Button from "./Button.js";
import Icon from "./Icon.js";
import AddIcon from "heroicons/solid/document-add.svg";

const CreateIcon = styled(Icon)`
  border-color: ${({ theme }) => theme.createIconButtonBorder};
  background-color: ${({ theme }) => theme.createIconButtonBackground};
  &:hover {
    background-color: ${({ theme }) => theme.createIconButtonBackgroundHover};
    color: ${({ theme }) => theme.createIconButtonBorder};
  }
`;

const CreateIconButton = ({ onClick }) => {
  return (
    <div>
      <Button onClick={onClick}>
        <CreateIcon>
          <AddIcon width={20} height={20} />
        </CreateIcon>
      </Button>
    </div>
  );
};

export default CreateIconButton;
