import React, { useState } from "react";
import { createItem, updateItem } from "../util/asyncActions.js";
import {
  SET_ITEM_DIALOG_CLOSED,
  SET_IS_LOADING_OFF,
  SET_IS_LOADING_ON,
} from "../util/actionTypes.js";
import itemTypes from "../util/itemTypes.js";

const ItemDialog = ({ dispatch, handleFetchItems, item }) => {
  const [itemType, setItemType] = useState(item ? item.type : itemTypes.note);
  const [itemTitle, setItemTitle] = useState(item ? item.title : "");
  const [itemBody, setItemBody] = useState(item ? item.body : "");

  const handleSubmit = async () => {
    event.preventDefault();

    dispatch({ type: SET_IS_LOADING_ON });

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

    await handleFetchItems(false);

    dispatch({ type: SET_IS_LOADING_OFF });
    dispatch({ type: SET_ITEM_DIALOG_CLOSED });
  };

  const handleCtrlEnter = (event) => {
    if (event.ctrlKey && event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleCancel = () => {
    dispatch({ type: SET_ITEM_DIALOG_CLOSED });
  };

  return (
    <div id="item-dialog" onKeyDown={handleCtrlEnter}>
      <div>
        <label>
          <input
            type="radio"
            name="type"
            checked={itemType === itemTypes.note}
            onChange={() => {
              setItemType(itemTypes.note);
            }}
            value={itemTypes.note}
          ></input>
          Note
        </label>
        <label>
          <input
            type="radio"
            name="type"
            checked={itemType === itemTypes.link}
            onChange={() => {
              setItemType(itemTypes.link);
            }}
            value={itemTypes.link}
          ></input>
          Link
        </label>
        <label>
          <input
            type="radio"
            name="type"
            checked={itemType === itemTypes.diary}
            onChange={() => {
              setItemType(itemTypes.diary);
            }}
            value={itemTypes.diary}
          ></input>
          Diary
        </label>
      </div>
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
        <button>Post</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ItemDialog;
