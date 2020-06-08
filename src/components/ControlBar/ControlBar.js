import React from "react";
import {
  FETCH_ITEMS_COMPLETE,
  FILTER_TEXT_CHANGED,
  FILTER_TYPE_CHANGED,
  SET_DARK_MODE,
  TOGGLE_ARCHIVE_MODE,
  SET_ITEM_DIALOG_OPEN,
  LOGOUT,
  SET_IS_LOADING_ON,
} from "../../util/actionTypes.js";
import { fetchItems } from "../../util/asyncActions.js";
import { useStore } from "../../util/Store.js";
import Columns from "../ui/layout/Columns.js";
import Column from "../ui/layout/Column.js";
import RefreshItems from "./RefreshItems.js";
import TypeSwitcher from "./TypeSwitcher.js";
import SearchBar from "./SearchBar.js";
import Controls from "./Controls.js";
import styled from "styled-components";

const StyledControlBar = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.controlBarBorderBottomColour};
  background-color: ${({ theme }) => theme.controlBarBackgroundColour};
  padding: ${({ theme }) => theme.controlBarPadding};
`;

const ControlBar = () => {
  const { state, dispatch } = useStore();

  const handleItemFilter = (event) => {
    dispatch({
      type: FILTER_TEXT_CHANGED,
      payload: event ? event.target.value : "",
    });
  };

  const handleTypeFilter = (type) => {
    dispatch({ type: FILTER_TYPE_CHANGED, payload: type });
  };

  const handleDarkMode = (event) => {
    dispatch({ type: SET_DARK_MODE, payload: event.target.checked });
  };

  const handleArchiveMode = async (event) => {
    dispatch({ type: TOGGLE_ARCHIVE_MODE });
    dispatch({ type: SET_IS_LOADING_ON });
    let items = await fetchItems(event.target.checked);
    dispatch({ type: FETCH_ITEMS_COMPLETE, payload: items });
  };

  const handleCreateItem = () => {
    dispatch({ type: SET_ITEM_DIALOG_OPEN });
  };

  const handleLogout = () => {
    dispatch({ type: LOGOUT });
  };

  const handleFetchItems = async () => {
    dispatch({ type: SET_IS_LOADING_ON });
    let items = await fetchItems(state.archiveMode);
    dispatch({ type: FETCH_ITEMS_COMPLETE, payload: items });
  };

  return (
    <StyledControlBar>
      <Columns space="small" justifyContent="space-between">
        <Column width="content">
          <Columns space="small">
            <Column>
              <RefreshItems
                handleFetchItems={handleFetchItems}
                isLoading={state.isLoading}
                label={"↻"}
              />
            </Column>
            <Column>
              <TypeSwitcher
                handleTypeFilter={handleTypeFilter}
                filterType={state.filterType}
              />
            </Column>
          </Columns>
        </Column>
        <Column width="fill">
          <SearchBar
            filterText={state.filterText}
            handleItemFilter={handleItemFilter}
          />
        </Column>
        <Column width="content">
          <Controls
            archiveMode={state.archiveMode}
            darkMode={state.darkMode}
            handleDarkMode={handleDarkMode}
            handleArchiveMode={handleArchiveMode}
            handleCreateItem={handleCreateItem}
            handleLogout={handleLogout}
          />
        </Column>
      </Columns>
    </StyledControlBar>
  );
};

export default ControlBar;
