import React from "react";
import styled from "styled-components";
import Button from "./Button.js";
import Icon from "./Icon.js";
import BoxIcon from "heroicons/solid/archive.svg";
import {
  SET_IS_LOADING_ON,
  FETCH_ACTIVE_ITEMS_COMPLETE,
  FETCH_ARCHIVED_ITEMS_COMPLETE,
} from "../../../util/actionTypes.js";
import { useStore } from "../../../util/Store.js";
import { fetchItems, updateItem } from "../../../util/asyncActions.js";

const ArchiveIcon = styled(Icon)`
  color: ${({ theme }) => theme.iconButtonBorder};
  &:hover {
    border-color: ${({ theme }) => theme.archiveIconButtonBorderHover};
    background-color: ${({ theme }) => theme.archiveIconButtonBackgroundHover};
    color: ${({ theme }) => theme.archiveIconButtonTextHover};
  }
`;

const ArchiveIconButton = ({ item }) => {
  const { state, dispatch } = useStore();

  return (
    <div>
      <Button
        onClick={async () => {
          dispatch({ type: SET_IS_LOADING_ON });
          item.isArchived = !item.isArchived;
          await updateItem(item);
          let items = await fetchItems(state.archiveMode);
          let complete = state.archiveMode
            ? FETCH_ARCHIVED_ITEMS_COMPLETE
            : FETCH_ACTIVE_ITEMS_COMPLETE;
          dispatch({ type: complete, payload: items });
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
