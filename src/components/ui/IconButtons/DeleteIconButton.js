import React from "react";
import styled from "styled-components";
import Button from "./Button.js";
import Icon from "./Icon.js";
import CrossIcon from "heroicons/solid/x.svg";
import { useStore } from "../../../util/Store.js";
import {
  SET_IS_LOADING_ON,
  FETCH_ACTIVE_ITEMS_COMPLETE,
  FETCH_ARCHIVED_ITEMS_COMPLETE,
} from "../../../util/actionTypes.js";
import { deleteItem, fetchItems } from "../../../util/asyncActions.js";

const DeleteIcon = styled(Icon)`
  color: ${({ theme }) => theme.iconButtonBorder};
  &:hover {
    border-color: ${({ theme }) => theme.deleteIconButtonBorderHover};
    background-color: ${({ theme }) => theme.deleteIconButtonBackgroundHover};
    color: ${({ theme }) => theme.deleteIconButtonTextHover};
  }
`;

const DeleteIconButton = ({ item }) => {
  const { state, dispatch } = useStore();

  return (
    <div>
      <Button
        onClick={async () => {
          dispatch({ type: SET_IS_LOADING_ON });
          await deleteItem(item.id, item.timestamp);
          let items = await fetchItems(state.archiveMode);
          let complete = state.archiveMode
            ? FETCH_ARCHIVED_ITEMS_COMPLETE
            : FETCH_ACTIVE_ITEMS_COMPLETE;
          dispatch({ type: complete, payload: items });
        }}
      >
        <DeleteIcon>
          <CrossIcon width={20} height={20} />
        </DeleteIcon>
      </Button>
    </div>
  );
};

export default DeleteIconButton;
