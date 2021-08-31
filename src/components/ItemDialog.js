import React, { useRef, useState, useEffect } from "react";
import { useStore } from "../util/Store.js";
import { createItem, updateItem, fetchItems } from "../util/asyncActions.js";
import {
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
import styled, { css, keyframes } from "styled-components";
import Stack from "./ui/layout/Stack.js";
import Columns from "./ui/layout/Columns.js";
import Column from "./ui/layout/Column.js";
import TextButton from "./ui/TextButton.js";
import CreateUpdateButton from "./ui/CreateUpdateButton.js";
import CancelButton from "./ui/CancelButton.js";
import TextArea from "./ui/TextArea.js";

const fadeInKeyframes = keyframes`
  from {
    transform: translateY(4px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeInMixin = css`
  animation: ${fadeInKeyframes} 0.2s ease-out;
`;

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

  @media only screen and (max-width: 849px) {
    padding: 1rem;
  }
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
  ${fadeInMixin};
`;

const isLinkItem = (body) => {
  return body.startsWith("http://") || body.startsWith("https://");
};

const isDiaryItem = (itemTitle) => {
  return itemTitle.startsWith("Work diary for");
};

const determineItemType = (title = "", body = "") => {
  if (isLinkItem(body)) {
    return itemTypes.link;
  }

  if (isDiaryItem(title)) {
    return itemTypes.diary;
  }

  if (!isLinkItem(body) && !isDiaryItem(title)) {
    return itemTypes.note;
  }
};

const ItemDialog = () => {
  const { state, dispatch } = useStore();

  const [itemType, setItemType] = useState(
    (state.item && state.item.type) || "note"
  );
  const [itemTitle, setItemTitle] = useState(
    (state.item && state.item.title) || ""
  );
  const [itemBody, setItemBody] = useState(
    (state.item && state.item.body) || ""
  );

  const bodyTextAreaRef = useRef(null);

  useEffect(() => {
    if (state.item) {
      setItemType(state.item.type);
      setItemTitle(state.item.title);
      setItemBody(state.item.body);
    }
  }, []);

  const handleSubmit = async () => {
    event.preventDefault();

    dispatch({ type: SET_IS_LOADING_ON });

    let payload = {
      title: itemTitle,
      body: itemBody,
      generateTitle: false,
      isArchived: false,
      type: determineItemType(itemTitle, itemBody),
    };

    dispatch({ type: SET_ITEM_DIALOG_CLOSED });

    if (state.item) {
      payload.type = determineItemType(state.item.title, state.item.body);
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

  const handleGenerateTitle = async () => {
    if (isLinkItem(itemBody)) {
      dispatch({ type: SET_IS_LOADING_ON });
      let titleFromUrl = await generateLinkTitle(itemBody);
      dispatch({ type: SET_IS_LOADING_OFF });
      setItemTitle(titleFromUrl);
    } else {
      setItemTitle(generateDiaryTitle());
    }

    bodyTextAreaRef.current.focus();
    return;
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
            <Column width={"fill"}>
              <Input
                type="text"
                placeholder="Title"
                onChange={(event) => setItemTitle(event.target.value)}
                disabled={state.isLoading}
                tabIndex={0}
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
            type="text"
            placeholder="Body"
            onChange={(event) => setItemBody(event.target.value)}
            value={itemBody}
            disabled={state.isLoading}
            ref={bodyTextAreaRef}
            stretch
            tabIndex={1}
          />
          <Columns space="small">
            <Column width="fill">
              <CancelButton disabled={state.isLoading} onClick={handleCancel} />
            </Column>

            <Column width="fill">
              <CreateUpdateButton
                isUpdate={state.item}
                disabled={state.isLoading}
                onClick={handleSubmit}
              />
            </Column>
          </Columns>
        </Stack>
      </ItemDialogContent>
    </ItemDialogContainer>
  );
};

export default ItemDialog;
