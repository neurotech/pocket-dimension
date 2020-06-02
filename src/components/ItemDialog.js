import React, { useState } from "react";
import { createItem } from "../util/asyncActions.js";

const ItemDialog = ({ handleFetchItems, handleCloseDialog, item }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [itemType, setItemType] = useState("note");
  const [itemTitle, setItemTitle] = useState("");
  const [itemBody, setItemBody] = useState("");

  const handleSubmit = async () => {
    event.preventDefault();

    setIsLoading(true);
    let item = {
      title: itemTitle,
      body: itemBody,
      generateTitle: false,
      isArchived: false,
      type: itemType,
    };
    await createItem(item);
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
