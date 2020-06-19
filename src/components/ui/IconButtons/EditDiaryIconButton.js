import React from "react";
import styled from "styled-components";
import Button from "./Button.js";
import Icon from "./Icon.js";
import BookIcon from "heroicons/solid/book-open.svg";
import BanIcon from "heroicons/solid/ban.svg";
import { useStore } from "../../../util/Store.js";
import { SET_ITEM_DIALOG_OPEN } from "../../../util/actionTypes.js";

const EditDiaryIcon = styled(Icon)`
  border-color: ${({ theme }) => theme.commonPalette.darkyellow};
  background-color: ${({ theme }) => theme.commonPalette.yellow};
  color: ${({ theme }) => theme.commonPalette.white};
  &:hover {
    background-color: ${({ theme }) => theme.commonPalette.lightyellow};
    color: ${({ theme }) => theme.commonPalette.darkyellow};
  }
`;

const StaleEditDiaryIcon = styled(Icon)`
  cursor: not-allowed;
  border-color: ${({ theme }) => theme.commonPalette.darkyellow};
  background-color: ${({ theme }) => theme.commonPalette.yellow};
  &:hover {
    background-color: ${({ theme }) => theme.commonPalette.yellow};
  }
`;

const getIcon = (isStale, children) => {
  if (isStale) {
    return (
      <StaleEditDiaryIcon>
        <BanIcon width={20} height={20} />
        {children}
      </StaleEditDiaryIcon>
    );
  }

  return (
    <EditDiaryIcon>
      <BookIcon width={20} height={20} />
      {children}
    </EditDiaryIcon>
  );
};

const DiaryIconButton = ({ item, isStale, children }) => {
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

export default DiaryIconButton;
