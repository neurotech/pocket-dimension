import React from "react";
import NoteItem from "./NoteItem.js";
import LinkItem from "./LinkItem.js";
import DiaryItem from "./DiaryItem.js";
import { deleteItem } from "../util/asyncActions.js";

export default class Items extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.handleFetchItems();
  }

  handleDeleteItem = async (id, timestamp) => {
    try {
      await deleteItem(id, timestamp);
      this.props.handleFetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const items = this.props.items;
    const theme = this.props.theme;
    const filterText = this.props.filterText;
    const filterType = this.props.filterType;

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
                theme={theme}
                handleDeleteItem={this.handleDeleteItem}
              />
            );

          case "link":
            return (
              <LinkItem
                item={item}
                key={item.id}
                handleDeleteItem={this.handleDeleteItem}
              />
            );

          case "diary":
            return (
              <DiaryItem
                item={item}
                key={item.id}
                theme={theme}
                handleDeleteItem={this.handleDeleteItem}
              />
            );
        }
      });
    };

    return <div>{renderItemByType(items)}</div>;
  }
}
