import React from "react";
import styled from "styled-components";
import Button from "./Button.js";
import Icon from "./Icon.js";
import CrossIcon from "heroicons/solid/x.svg";

const DeleteIcon = styled(Icon)`
  color: ${({ theme }) => theme.iconButtonBorder};
  &:hover {
    border-color: ${({ theme }) => theme.deleteIconButtonBorderHover};
    background-color: ${({ theme }) => theme.deleteIconButtonBackgroundHover};
    color: ${({ theme }) => theme.deleteIconButtonTextHover};
  }
`;

const DeleteIconButton = ({ onClick }) => {
  return (
    <div>
      <Button onClick={onClick}>
        <DeleteIcon>
          <CrossIcon width={20} height={20} />
        </DeleteIcon>
      </Button>
    </div>
  );
};

export default DeleteIconButton;
