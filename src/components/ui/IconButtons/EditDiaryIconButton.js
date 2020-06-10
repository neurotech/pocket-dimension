import React from "react";
import styled from "styled-components";
import Button from "./Button.js";
import Icon from "./Icon.js";
import BookIcon from "heroicons/solid/book-open.svg";
import { useStore } from "../../../util/Store.js";
import { SET_ITEM_DIALOG_OPEN } from "../../../util/actionTypes.js";

const DiaryIcon = styled(Icon)`
  border-color: ${({ theme }) => theme.diaryIconButtonBorder};
  background-color: ${({ theme }) => theme.diaryIconButtonBackground};
  &:hover {
    background-color: ${({ theme }) => theme.diaryIconButtonBackgroundHover};
    color: ${({ theme }) => theme.diaryIconButtonBorder};
  }
`;

const DiaryIconButton = ({ item, children }) => {
  const { dispatch } = useStore();

  return (
    <div>
      <Button
        onClick={() => {
          dispatch({ type: SET_ITEM_DIALOG_OPEN, payload: item });
        }}
      >
        <DiaryIcon>
          <BookIcon width={20} height={20} />
          {children}
        </DiaryIcon>
      </Button>
    </div>
  );
};

export default DiaryIconButton;
