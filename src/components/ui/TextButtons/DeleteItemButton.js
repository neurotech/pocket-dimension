import React from "react";
import styled from "styled-components";
import TextButton from "../TextButton.js";
import { useStore } from "../../../util/Store.js";
import {
  SET_STALE_ITEM,
  SET_IS_LOADING_ON,
  FETCH_ACTIVE_ITEMS_COMPLETE,
  FETCH_ARCHIVED_ITEMS_COMPLETE,
  SET_CURRENT_ITEMS,
} from "../../../util/actionTypes.js";
import { deleteItem, fetchItems } from "../../../util/asyncActions.js";

const StyledTextButton = styled(TextButton)`
  padding: 0.75rem 0.5rem;
  border-color: ${({ theme }) => theme.palette.iconBorder};
  background-color: ${({ theme }) => theme.palette.iconBackground};
  color: ${({ theme }) => theme.palette.iconText};
  &:hover {
    border-color: ${({ theme }) => theme.commonPalette.darkred};
    background-color: ${({ theme }) => theme.commonPalette.red};
    color: ${({ theme }) => theme.commonPalette.white};
  }
`;

const DeleteIconButton = ({ item }) => {
  const { state, dispatch } = useStore();

  return (
    <StyledTextButton
      label={"Delete"}
      onClick={async () => {
        dispatch({ type: SET_STALE_ITEM, payload: item.id });
        dispatch({ type: SET_IS_LOADING_ON });
        await deleteItem(item.id, item.timestamp);
        let fetchedItems = await fetchItems(state.archiveMode);
        let complete = state.archiveMode
          ? FETCH_ARCHIVED_ITEMS_COMPLETE
          : FETCH_ACTIVE_ITEMS_COMPLETE;
        dispatch({ type: complete, payload: fetchedItems });

        if (fetchedItems.length > state.pageSize) {
          dispatch({
            type: SET_CURRENT_ITEMS,
            payload: fetchedItems.slice(0, state.pageSize),
          });
        } else {
          dispatch({ type: SET_CURRENT_ITEMS, payload: fetchedItems });
        }
      }}
    />
  );
};

export default DeleteIconButton;
