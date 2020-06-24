import React from "react";
import styled from "styled-components";
import Button from "./Button.js";
import Icon from "./Icon.js";
import PaperClipIcon from "heroicons/solid/paper-clip.svg";
import { useStore } from "../../../util/Store.js";
import { FILTER_TYPE_CHANGED } from "../../../util/actionTypes.js";
import itemTypes from "../../../util/itemTypes.js";

const NoteIcon = styled(Icon)`
  border-color: ${({ theme }) => theme.commonPalette.darkblue};
  background-color: ${({ theme }) => theme.commonPalette.blue};
  color: ${({ theme }) => theme.commonPalette.white};

  &:hover {
    background-color: ${({ theme }) => theme.commonPalette.lightblue};
    color: ${({ theme }) => theme.commonPalette.darkblue};
  }
`;

const NoteIconButton = ({ children }) => {
  const { dispatch } = useStore();

  return (
    <Button
      title={"Show all Note items"}
      onClick={() => {
        dispatch({ type: FILTER_TYPE_CHANGED, payload: itemTypes.note });
      }}
    >
      <NoteIcon>
        <PaperClipIcon width={20} height={20} />
        {children}
      </NoteIcon>
    </Button>
  );
};

export default NoteIconButton;
