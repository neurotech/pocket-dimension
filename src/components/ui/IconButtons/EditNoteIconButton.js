import React from "react";
import styled from "styled-components";
import Button from "./Button.js";
import Icon from "./Icon.js";
import PaperClipIcon from "heroicons/solid/paper-clip.svg";
import BanIcon from "heroicons/solid/ban.svg";
import { useStore } from "../../../util/Store.js";
import { SET_ITEM_DIALOG_OPEN } from "../../../util/actionTypes.js";

const EditNoteIcon = styled(Icon)`
  border-color: ${({ theme }) => theme.commonPalette.darkblue};
  background-color: ${({ theme }) => theme.commonPalette.blue};
  color: ${({ theme }) => theme.commonPalette.white};
  &:hover {
    background-color: ${({ theme }) => theme.commonPalette.lightblue};
    color: ${({ theme }) => theme.commonPalette.darkblue};
  }
`;

const StaleEditNoteIcon = styled(Icon)`
  cursor: not-allowed;
  border-color: ${({ theme }) => theme.commonPalette.darkblue};
  background-color: ${({ theme }) => theme.commonPalette.blue};
  &:hover {
    background-color: ${({ theme }) => theme.commonPalette.blue};
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
    <Button
      title={"Edit this Note item"}
      onClick={() => {
        dispatch({ type: SET_ITEM_DIALOG_OPEN, payload: item });
      }}
    >
      {getIcon(isStale, children)}
    </Button>
  );
};

export default NoteIconButton;
