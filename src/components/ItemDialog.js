import React, { useRef, useState } from "react";
import { useStore } from "../util/Store.js";
import { createItem, updateItem, fetchItems } from "../util/asyncActions.js";
import {
  generateNoteTitle,
  generateLinkTitle,
  generateDiaryTitle,
} from "../util/generateTitle.js";
import {
  FETCH_ACTIVE_ITEMS_COMPLETE,
  SET_ITEM_DIALOG_CLOSED,
  SET_IS_LOADING_ON,
  FETCH_ARCHIVED_ITEMS_COMPLETE,
  SET_CURRENT_ITEMS,
  SET_IS_LOADING_OFF,
} from "../util/actionTypes.js";
import itemTypes from "../util/itemTypes.js";
import { Input } from "./ui/Input.js";
import styled from "styled-components";
import Stack from "./ui/layout/Stack.js";
import Columns from "./ui/layout/Columns.js";
import Column from "./ui/layout/Column.js";
import TypeButton from "./ui/TypeButton.js";
import TextButton from "./ui/TextButton.js";
import CreateButton from "./ui/CreateButton.js";
import CancelButton from "./ui/CancelButton.js";
import TextArea from "./ui/TextArea.js";

const ItemDialogContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.commonPalette.smoke};
  padding: 1rem 14rem;
  z-index: 1;
`;

const ItemDialogContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.palette.itemDialogBackground};
  padding: 1rem;
  border-radius: 0.33rem;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ theme }) => theme.palette.itemDialogBorder};
  z-index: 999;
`;

const ItemDialog = () => {
  const { state, dispatch } = useStore();

  const [itemType, setItemType] = useState(
    state.item ? state.item.type : itemTypes.note
  );
  const [itemTitle, setItemTitle] = useState(
    state.item ? state.item.title : ""
  );
  const [itemBody, setItemBody] = useState(state.item ? state.item.body : "");

  const bodyTextAreaRef = useRef(null);

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

  const setItemTypeToNote = () => {
    setItemType(itemTypes.note);
    setItemTitle("");
    bodyTextAreaRef.current.focus();
  };

  const setItemTypeToLink = () => {
    setItemType(itemTypes.link);
    setItemTitle("");
    bodyTextAreaRef.current.focus();
  };

  const setItemTypeToDiary = () => {
    setItemType(itemTypes.diary);
    setItemTitle(generateDiaryTitle());
    bodyTextAreaRef.current.focus();
  };

  const handleGenerateTitle = async () => {
    switch (itemType) {
      case itemTypes.note:
        setItemTitle(generateNoteTitle());
        bodyTextAreaRef.current.focus();
        break;

      case itemTypes.link:
        if (itemBody !== "") {
          dispatch({ type: SET_IS_LOADING_ON });
          let titleFromUrl = await generateLinkTitle(itemBody);
          setItemTitle(titleFromUrl);
          dispatch({ type: SET_IS_LOADING_OFF });
        }
        bodyTextAreaRef.current.focus();
        break;

      case itemTypes.diary:
        setItemTitle(generateDiaryTitle());
        bodyTextAreaRef.current.focus();
        break;
    }
  };

  return (
    <ItemDialogContainer onKeyDown={handleCtrlEnter}>
      <ItemDialogContent>
        <Stack
          space="small"
          flexGrow={1}
          flexShrink={1}
          justifyContent={"space-between"}
        >
          <Columns space="small">
            <Column width="fill">
              <TypeButton
                active={itemType === itemTypes.note}
                onClick={setItemTypeToNote}
                variant={itemTypes.note}
              />
            </Column>

            <Column width="fill">
              <TypeButton
                active={itemType === itemTypes.link}
                onClick={setItemTypeToLink}
                variant={itemTypes.link}
              />
            </Column>

            <Column width="fill">
              <TypeButton
                active={itemType === itemTypes.diary}
                onClick={setItemTypeToDiary}
                variant={itemTypes.diary}
              />
            </Column>
          </Columns>

          <Columns space="small">
            <Column width={"fill"}>
              <Input
                type="text"
                placeholder="Title"
                onChange={(event) => setItemTitle(event.target.value)}
                disabled={state.isLoading}
                value={itemTitle}
              />
            </Column>
            <Column width={"content"}>
              <TextButton
                size={"normal"}
                disabled={state.isLoading}
                label={"Generate"}
                onClick={handleGenerateTitle}
              />
            </Column>
          </Columns>
          <TextArea
            type="body"
            placeholder="Body"
            onChange={(event) => setItemBody(event.target.value)}
            value={itemBody}
            disabled={state.isLoading}
            ref={bodyTextAreaRef}
            stretch
          />
          <Columns space="small">
            <Column width="fill">
              <CreateButton disabled={state.isLoading} onClick={handleSubmit} />
            </Column>
            <Column width="fill">
              <CancelButton disabled={state.isLoading} onClick={handleCancel} />
            </Column>
          </Columns>
        </Stack>
      </ItemDialogContent>
    </ItemDialogContainer>
  );
};

export default ItemDialog;
