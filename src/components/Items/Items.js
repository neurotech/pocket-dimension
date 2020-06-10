import React, { useEffect } from "react";
import NoteItem from "./NoteItem.js";
import LinkItem from "./LinkItem.js";
import DiaryItem from "./DiaryItem.js";
import { fetchItems } from "../../util/asyncActions.js";
import {
  FETCH_ACTIVE_ITEMS_COMPLETE,
  SET_IS_LOADING_ON,
  FETCH_ARCHIVED_ITEMS_COMPLETE,
} from "../../util/actionTypes.js";
import itemTypes from "../../util/itemTypes.js";
import { useStore } from "../../util/Store.js";
import Stack from "../ui/layout/Stack.js";

const Items = () => {
  const { state, dispatch } = useStore();

  useEffect(() => {
    async function fetchItemsOnMount() {
      dispatch({ type: SET_IS_LOADING_ON });
      let items = await fetchItems(state.archiveMode);
      let complete = state.archiveMode
        ? FETCH_ARCHIVED_ITEMS_COMPLETE
        : FETCH_ACTIVE_ITEMS_COMPLETE;
      dispatch({ type: complete, payload: items });
    }
    fetchItemsOnMount();
  }, []);

  const renderItemByType = (items) => {
    const itemsFilteredByType = items.filter(
      (item) => item.type === state.filterType || state.filterType === "all"
    );

    const itemsFilteredByText = itemsFilteredByType.filter(
      (item) =>
        ~item.title.toLowerCase().indexOf(state.filterText.toLowerCase()) ||
        ~item.body.toLowerCase().indexOf(state.filterText.toLowerCase())
    );

    return itemsFilteredByText.map((item) => {
      switch (item.type) {
        case itemTypes.note:
          return <NoteItem item={item} key={item.id} />;

        case itemTypes.link:
          return <LinkItem item={item} key={item.id} />;

        case itemTypes.diary:
          return <DiaryItem item={item} key={item.id} />;
      }
    });
  };

  return (
    <Stack space="small" padLastChild>
      {renderItemByType(state.archiveMode ? state.archivedItems : state.items)}
    </Stack>
  );
};

export default React.memo(Items);
