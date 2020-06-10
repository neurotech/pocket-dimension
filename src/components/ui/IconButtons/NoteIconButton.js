import React from "react";
import styled from "styled-components";
import Button from "./Button.js";
import Icon from "./Icon.js";
import PaperClipIcon from "heroicons/solid/paper-clip.svg";

const NoteIcon = styled(Icon)`
  border-color: ${({ theme }) => theme.noteIconButtonBorder};
  background-color: ${({ theme }) => theme.noteIconButtonBackground};
  &:hover {
    background-color: ${({ theme }) => theme.noteIconButtonBackgroundHover};
    color: ${({ theme }) => theme.noteIconButtonBorder};
  }
`;

const NoteIconButton = ({ onClick, children }) => {
  return (
    <div>
      <Button onClick={onClick}>
        <NoteIcon>
          <PaperClipIcon width={20} height={20} />
          {children}
        </NoteIcon>
      </Button>
    </div>
  );
};

export default NoteIconButton;
