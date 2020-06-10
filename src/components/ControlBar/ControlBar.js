import React from "react";
import {
  FETCH_ACTIVE_ITEMS_COMPLETE,
  FILTER_TEXT_CHANGED,
  FILTER_TYPE_CHANGED,
  SET_IS_LOADING_ON,
} from "../../util/actionTypes.js";
import { fetchItems } from "../../util/asyncActions.js";
import { useStore } from "../../util/Store.js";
import Columns from "../ui/layout/Columns.js";
import Column from "../ui/layout/Column.js";
import TypeSwitcher from "./TypeSwitcher.js";
import SearchBar from "./SearchBar.js";
import Controls from "./Controls.js";
import styled from "styled-components";
import RefreshIconButton from "../ui/IconButtons/RefreshIconButton.js";

const StyledControlBar = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.controlBarBorderBottomColour};
  background-color: ${({ theme }) => theme.controlBarBackgroundColour};
  padding: ${({ theme }) => theme.controlBarPadding};
`;

const ControlBar = () => {
  return (
    <StyledControlBar>
      <Columns space="small" justifyContent="space-between">
        <Column width="content">
          <Columns space="small">
            <Column>
              <RefreshIconButton />
            </Column>
            <Column>
              <TypeSwitcher />
            </Column>
          </Columns>
        </Column>
        <Column width="fill">
          <SearchBar />
        </Column>
        <Column width="content">
          <Controls />
        </Column>
      </Columns>
    </StyledControlBar>
  );
};

export default ControlBar;
