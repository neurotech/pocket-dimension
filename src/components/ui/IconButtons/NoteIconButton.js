import React from "react";
import styled from "styled-components";
import Button from "./Button.js";
import Icon from "./Icon.js";
import PaperClipIcon from "heroicons/solid/paper-clip.svg";
import { useStore } from "../../../util/Store.js";
import { FILTER_TYPE_CHANGED } from "../../../util/actionTypes.js";
import itemTypes from "../../../util/itemTypes.js";

const NoteIcon = styled(Icon)`
  border-color: ${({ theme }) => theme.noteIconButtonBorder};
  background-color: ${({ theme }) => theme.noteIconButtonBackground};
  &:hover {
    background-color: ${({ theme }) => theme.noteIconButtonBackgroundHover};
    color: ${({ theme }) => theme.noteIconButtonBorder};
  }
`;

const NoteIconButton = ({ children }) => {
  const { dispatch } = useStore();

  return (
    <div>
      <Button
        onClick={() => {
          dispatch({ type: FILTER_TYPE_CHANGED, payload: itemTypes.note });
        }}
      >
        <NoteIcon>
          <PaperClipIcon width={20} height={20} />
          {children}
        </NoteIcon>
      </Button>
    </div>
  );
};

export default NoteIconButton;
