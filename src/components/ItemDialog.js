import React, { useState } from "react";
import { createItem, updateItem } from "../util/asyncActions.js";

const ItemDialog = ({ handleFetchItems, handleCloseDialog, item }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [itemType, setItemType] = useState(item ? item.type : "note");
  const [itemTitle, setItemTitle] = useState(item ? item.title : "");
  const [itemBody, setItemBody] = useState(item ? item.body : "");

  const handleSubmit = async () => {
    event.preventDefault();

    setIsLoading(true);

    let payload = {
      title: itemTitle,
      body: itemBody,
      generateTitle: false,
      isArchived: false,
      type: itemType,
    };

    if (item) {
      payload.id = item.id;
      payload.timestamp = item.timestamp;
      await updateItem(payload);
    } else {
      await createItem(payload);
    }

    setIsLoading(false);

    handleCloseDialog();
    handleFetchItems(false);
  };

  return (
    <div id="item-dialog">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          onChange={(event) => setItemTitle(event.target.value)}
          value={itemTitle}
        ></input>
        <input
          type="body"
          placeholder="Body"
          onChange={(event) => setItemBody(event.target.value)}
          value={itemBody}
        ></input>
        <button disabled={isLoading}>Post</button>
      </form>
    </div>
  );
};

export default ItemDialog;
