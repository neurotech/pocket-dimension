import React from "react";
import styled from "styled-components";
import Button from "./Button.js";
import Icon from "./Icon.js";
import BookIcon from "heroicons/solid/book-open.svg";
import { useStore } from "../../../util/Store.js";
import { FILTER_TYPE_CHANGED } from "../../../util/actionTypes.js";
import itemTypes from "../../../util/itemTypes.js";

const DiaryIcon = styled(Icon)`
  border-color: ${({ theme }) => theme.diaryIconButtonBorder};
  background-color: ${({ theme }) => theme.diaryIconButtonBackground};
  &:hover {
    background-color: ${({ theme }) => theme.diaryIconButtonBackgroundHover};
    color: ${({ theme }) => theme.diaryIconButtonBorder};
  }
`;

const DiaryIconButton = ({ children }) => {
  const { dispatch } = useStore();

  return (
    <div>
      <Button
        onClick={() => {
          dispatch({ type: FILTER_TYPE_CHANGED, payload: itemTypes.diary });
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