import React, { useEffect } from "react";
import NoteItem from "./NoteItem.js";
import LinkItem from "./LinkItem.js";
import DiaryItem from "./DiaryItem.js";
import { updateItem, deleteItem } from "../util/asyncActions.js";
import {
  SET_ITEM_DIALOG_OPEN,
  FILTER_TEXT_CHANGED,
  SET_IS_LOADING_OFF,
  SET_IS_LOADING_ON,
} from "../util/actionTypes.js";
import itemTypes from "../util/itemTypes.js";

const Items = ({
  archiveMode,
  darkMode,
  dispatch,
  filterText,
  filterType,
  handleFetchItems,
  items,
}) => {
  useEffect(() => {
    async function fetchItems() {
      await handleFetchItems();
    }
    fetchItems();
  }, []);

  const handleArchiveItem = async (item) => {
    dispatch({ type: SET_IS_LOADING_ON });
    try {
      item.isArchived = !item.isArchived;
      await updateItem(item);
      handleFetchItems(archiveMode);
    } catch (error) {
      console.error(error);
    }
    dispatch({ type: SET_IS_LOADING_OFF });
  };

  const handleDeleteItem = async (id, timestamp) => {
    dispatch({ type: SET_IS_LOADING_ON });
    try {
      await deleteItem(id, timestamp);
      handleFetchItems(archiveMode);
    } catch (error) {
      console.error(error);
    }
    dispatch({ type: SET_IS_LOADING_OFF });
  };

  const handleEditItem = (item) => {
    dispatch({ type: SET_ITEM_DIALOG_OPEN, payload: item });
  };

  const handleFocusItem = (title) => {
    dispatch({ type: FILTER_TEXT_CHANGED, payload: title });
  };

  const renderItemByType = (items) => {
    const itemsFilteredByType = items.filter(
      (item) => item.type === filterType || filterType === "all"
    );

    const itemsFilteredByText = itemsFilteredByType.filter(
      (item) =>
        ~item.title.toLowerCase().indexOf(filterText.toLowerCase()) ||
        ~item.body.toLowerCase().indexOf(filterText.toLowerCase())
    );

    return itemsFilteredByText.map((item) => {
      switch (item.type) {
        case itemTypes.note:
          return (
            <NoteItem
              item={item}
              key={item.id}
              darkMode={darkMode}
              handleArchiveItem={handleArchiveItem}
              handleDeleteItem={handleDeleteItem}
              handleEditItem={handleEditItem}
              handleFocusItem={handleFocusItem}
            />
          );

        case itemTypes.link:
          return (
            <LinkItem
              item={item}
              key={item.id}
              handleArchiveItem={handleArchiveItem}
              handleDeleteItem={handleDeleteItem}
              handleEditItem={handleEditItem}
            />
          );

        case itemTypes.diary:
          return (
            <DiaryItem
              item={item}
              key={item.id}
              darkMode={darkMode}
              handleArchiveItem={handleArchiveItem}
              handleDeleteItem={handleDeleteItem}
              handleEditItem={handleEditItem}
            />
          );
      }
    });
  };

  return <div>{renderItemByType(items)}</div>;
};

export default Items;
