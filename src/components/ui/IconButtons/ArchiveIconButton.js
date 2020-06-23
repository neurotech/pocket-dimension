import React from "react";
import styled from "styled-components";
import Button from "./Button.js";
import Icon from "./Icon.js";
import BoxIcon from "heroicons/solid/archive.svg";
import {
  SET_IS_LOADING_ON,
  SET_STALE_ITEM,
  FETCH_ARCHIVED_ITEMS_COMPLETE,
  FETCH_ACTIVE_ITEMS_COMPLETE,
  SET_CURRENT_ITEMS,
} from "../../../util/actionTypes.js";
import { useStore } from "../../../util/Store.js";
import { fetchItems, updateItem } from "../../../util/asyncActions.js";

const ArchiveIcon = styled(Icon)`
  color: ${({ theme }) => theme.palette.iconText};
  &:hover {
    border-color: ${({ theme }) => theme.commonPalette.darkyellow};
    background-color: ${({ theme }) => theme.commonPalette.yellow};
    color: ${({ theme }) => theme.commonPalette.white};
  }
`;

const ArchiveIconButton = ({ item }) => {
  const { state, dispatch } = useStore();

  return (
    <div>
      <Button
        onClick={async () => {
          dispatch({ type: SET_STALE_ITEM, payload: item.id });
          dispatch({ type: SET_IS_LOADING_ON });
          item.isArchived = !item.isArchived;
          await updateItem(item);
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
      >
        <ArchiveIcon>
          <BoxIcon width={20} height={20} />
        </ArchiveIcon>
      </Button>
    </div>
  );
};

export default ArchiveIconButton;
