import React, { useEffect, useLayoutEffect, useRef } from "react";
import NoteItem from "./NoteItem.js";
import LinkItem from "./LinkItem.js";
import DiaryItem from "./DiaryItem.js";
import { fetchItems } from "../../util/asyncActions.js";
import {
  FETCH_ACTIVE_ITEMS_COMPLETE,
  FETCH_ARCHIVED_ITEMS_COMPLETE,
  SET_CURRENT_ITEMS,
  SET_IS_LOADING_ON,
} from "../../util/actionTypes.js";
import itemTypes from "../../util/itemTypes.js";
import { useStore } from "../../util/Store.js";
import Stack from "../ui/layout/Stack.js";
import MoreButton from "./MoreButton.js";
import styled from "styled-components";

const LoadingContainer = styled.div`
  opacity: ${(props) => (props.isLoading ? 0.33 : 1)};
`;

const Pagination = ({ totalItems, onClick, children }) => {
  const { state } = useStore();
  const moreToGet =
    state.filterText === "" && state.currentItems.length < totalItems;

  return (
    <Stack space="small" padLastChild>
      {children}
      {moreToGet && <MoreButton onClick={onClick} />}
    </Stack>
  );
};

const Items = () => {
  const { state, dispatch } = useStore();
  const bottom = useRef(null);

  const getMoreItems = () => {
    const sliceEnd = state.currentItems.length + state.pageSize;
    const itemsToSlice = state.archiveMode ? state.archivedItems : state.items;
    dispatch({
      type: SET_CURRENT_ITEMS,
      payload: itemsToSlice.slice(0, sliceEnd),
    });
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      getMoreItems();
    }
  };

  useEffect(() => {
    async function fetchItemsOnMount() {
      dispatch({ type: SET_IS_LOADING_ON });
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
    }
    fetchItemsOnMount();
  }, []);

  useLayoutEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  useLayoutEffect(() => {
    bottom.current.scrollIntoView({ behavior: "smooth" });
  }, [state.scrollToBottom]);

  const renderItemsByType = (items) => {
    const itemsFilteredByText = items.filter(
      (item) =>
        ~item.title.toLowerCase().indexOf(state.filterText.toLowerCase()) ||
        ~item.body.toLowerCase().indexOf(state.filterText.toLowerCase())
    );

    return itemsFilteredByText.map((item) => {
      const isStale = state.staleItems.indexOf(item.id) !== -1;

      switch (item.type) {
        case itemTypes.note:
          return <NoteItem item={item} key={item.id} isStale={isStale} />;

        case itemTypes.link:
          return <LinkItem item={item} key={item.id} isStale={isStale} />;

        case itemTypes.diary:
          return <DiaryItem item={item} key={item.id} isStale={isStale} />;
      }
    });
  };

  const items = state.archiveMode ? state.archivedItems : state.items;

  const itemsToRender =
    state.filterType != "all" || state.filterText !== ""
      ? items
      : state.currentItems;

  return (
    <LoadingContainer isLoading={state.isLoading}>
      <Pagination totalItems={items.length} onClick={getMoreItems}>
        {renderItemsByType(itemsToRender)}
      </Pagination>
      <div id={"scroll-to-here"} ref={bottom} />
    </LoadingContainer>
  );
};

export default React.memo(Items);
