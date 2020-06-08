import React from "react";
import { useStore } from "../../util/Store.js";
import FocusItemButton from "./FocusItemButton.js";
import ArchiveItemButton from "./ArchiveItemButton.js";
import DeleteItemButton from "./DeleteItemButton.js";
import { deleteItem, fetchItems, updateItem } from "../../util/asyncActions.js";
import {
  FETCH_ITEMS_COMPLETE,
  SET_IS_LOADING_ON,
  SET_ITEM_DIALOG_OPEN,
  FILTER_TEXT_CHANGED,
} from "../../util/actionTypes.js";
import Columns from "../ui/layout/Columns.js";
import Column from "../ui/layout/Column.js";

const ItemControls = ({ item }) => {
  const { state, dispatch } = useStore();

  const handleArchiveItem = async () => {
    dispatch({ type: SET_IS_LOADING_ON });
    item.isArchived = !item.isArchived;
    await updateItem(item);
    let items = await fetchItems(state.archiveMode);
    dispatch({ type: FETCH_ITEMS_COMPLETE, payload: items });
  };

  const handleDeleteItem = async () => {
    dispatch({ type: SET_IS_LOADING_ON });
    await deleteItem(item.id, item.timestamp);
    let items = await fetchItems(state.archiveMode);
    dispatch({ type: FETCH_ITEMS_COMPLETE, payload: items });
  };

  const handleFocusItem = () => {
    dispatch({ type: FILTER_TEXT_CHANGED, payload: item.title });
  };

  return (
    <Columns space="xsmall">
      <Column>
        <FocusItemButton handleFocusItem={handleFocusItem} />
      </Column>
      <Column>
        <ArchiveItemButton handleArchiveItem={handleArchiveItem} />
      </Column>
      <Column>
        <DeleteItemButton handleDeleteItem={handleDeleteItem} />
      </Column>
    </Columns>
  );
};

export default ItemControls;
