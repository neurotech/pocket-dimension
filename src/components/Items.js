import React, { useState, useEffect } from "react";
import NoteItem from "./NoteItem.js";
import LinkItem from "./LinkItem.js";
import DiaryItem from "./DiaryItem.js";
import { updateItem, deleteItem } from "../util/asyncActions.js";

const Items = ({
  archiveMode,
  darkMode,
  filterText,
  filterType,
  handleEditItem,
  handleFetchItems,
  items,
}) => {
  const handleArchiveItem = async (item) => {
    try {
      item.isArchived = !item.isArchived;
      await updateItem(item);
      handleFetchItems(archiveMode);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteItem = async (id, timestamp) => {
    try {
      await deleteItem(id, timestamp);
      handleFetchItems(archiveMode);
    } catch (error) {
      console.error(error);
    }
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
        case "note":
          return (
            <NoteItem
              item={item}
              key={item.id}
              darkMode={darkMode}
              handleArchiveItem={handleArchiveItem}
              handleDeleteItem={handleDeleteItem}
              handleEditItem={handleEditItem}
            />
          );

        case "link":
          return (
            <LinkItem
              item={item}
              key={item.id}
              handleArchiveItem={handleArchiveItem}
              handleDeleteItem={handleDeleteItem}
              handleEditItem={handleEditItem}
            />
          );

        case "diary":
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

  useEffect(() => {
    handleFetchItems();
  }, []);

  return <div>{renderItemByType(items)}</div>;
};

export default Items;
