import React from "react";
import styled from "styled-components";
import Button from "./Button.js";
import Icon from "./Icon.js";
import PaperClipIcon from "heroicons/solid/paper-clip.svg";
import BanIcon from "heroicons/solid/ban.svg";
import { useStore } from "../../../util/Store.js";
import { SET_ITEM_DIALOG_OPEN } from "../../../util/actionTypes.js";

const EditNoteIcon = styled(Icon)`
  border-color: ${({ theme }) => theme.noteIconButtonBorder};
  background-color: ${({ theme }) => theme.noteIconButtonBackground};
  &:hover {
    background-color: ${({ theme }) => theme.noteIconButtonBackgroundHover};
    color: ${({ theme }) => theme.noteIconButtonBorder};
  }
`;

const StaleEditNoteIcon = styled(Icon)`
  cursor: not-allowed;
  border-color: ${({ theme }) => theme.noteIconButtonBorder};
  background-color: ${({ theme }) => theme.noteIconButtonBackground};
  &:hover {
    background-color: ${({ theme }) => theme.noteIconButtonBackground};
  }
`;

const getIcon = (isStale, children) => {
  if (isStale) {
    return (
      <StaleEditNoteIcon>
        <BanIcon width={20} height={20} />
        {children}
      </StaleEditNoteIcon>
    );
  }

  return (
    <EditNoteIcon>
      <PaperClipIcon width={20} height={20} />
      {children}
    </EditNoteIcon>
  );
};

const NoteIconButton = ({ item, isStale, children }) => {
  const { dispatch } = useStore();

  return (
    <div>
      <Button
        onClick={() => {
          dispatch({ type: SET_ITEM_DIALOG_OPEN, payload: item });
        }}
      >
        {getIcon(isStale, children)}
      </Button>
    </div>
  );
};

export default NoteIconButton;
