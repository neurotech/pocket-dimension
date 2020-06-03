import React from "react";
import NoteItem from "./NoteItem.js";
import LinkItem from "./LinkItem.js";
import DiaryItem from "./DiaryItem.js";
import { updateItem, deleteItem } from "../util/asyncActions.js";

export default class Items extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.handleFetchItems();
  }

  handleArchiveItem = async (item) => {
    try {
      item.isArchived = !item.isArchived;
      await updateItem(item);
      this.props.handleFetchItems(this.props.archiveMode);
    } catch (error) {
      console.error(error);
    }
  };

  handleDeleteItem = async (id, timestamp) => {
    try {
      await deleteItem(id, timestamp);
      this.props.handleFetchItems(this.props.archiveMode);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const items = this.props.items;
    const darkMode = this.props.darkMode;
    const filterText = this.props.filterText;
    const filterType = this.props.filterType;
    const handleEditItem = this.props.handleEditItem;

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
                handleArchiveItem={this.handleArchiveItem}
                handleDeleteItem={this.handleDeleteItem}
                handleEditItem={handleEditItem}
              />
            );

          case "link":
            return (
              <LinkItem
                item={item}
                key={item.id}
                handleArchiveItem={this.handleArchiveItem}
                handleDeleteItem={this.handleDeleteItem}
                handleEditItem={handleEditItem}
              />
            );

          case "diary":
            return (
              <DiaryItem
                item={item}
                key={item.id}
                darkMode={darkMode}
                handleArchiveItem={this.handleArchiveItem}
                handleDeleteItem={this.handleDeleteItem}
                handleEditItem={handleEditItem}
              />
            );
        }
      });
    };

    return <div>{renderItemByType(items)}</div>;
  }
}
