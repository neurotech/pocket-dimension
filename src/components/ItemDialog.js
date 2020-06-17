import React, { useState } from "react";
import { useStore } from "../util/Store.js";
import { createItem, updateItem, fetchItems } from "../util/asyncActions.js";
import {
  FETCH_ACTIVE_ITEMS_COMPLETE,
  SET_ITEM_DIALOG_CLOSED,
  SET_IS_LOADING_ON,
  FETCH_ARCHIVED_ITEMS_COMPLETE,
  SET_CURRENT_ITEMS,
} from "../util/actionTypes.js";
import itemTypes from "../util/itemTypes.js";
import { Input } from "./ui/Input.js";

const ItemDialog = () => {
  const { state, dispatch } = useStore();

  const [itemType, setItemType] = useState(
    state.item ? state.item.type : itemTypes.note
  );
  const [itemTitle, setItemTitle] = useState(
    state.item ? state.item.title : ""
  );
  const [itemBody, setItemBody] = useState(state.item ? state.item.body : "");

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

    if (state.item) {
      payload.id = state.item.id;
      payload.timestamp = state.item.timestamp;
      await updateItem(payload);
    } else {
      await createItem(payload);
    }

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
        <Input
          type="text"
          placeholder="Title"
          onChange={(event) => setItemTitle(event.target.value)}
          value={itemTitle}
        />
        <textarea
          type="body"
          placeholder="Body"
          onChange={(event) => setItemBody(event.target.value)}
          value={itemBody}
        ></textarea>
        <button>Post</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ItemDialog;
