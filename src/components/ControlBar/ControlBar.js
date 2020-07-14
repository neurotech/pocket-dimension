import React from "react";
import Columns from "../ui/layout/Columns.js";
import Column from "../ui/layout/Column.js";
import TypeSwitcher from "./TypeSwitcher.js";
import SearchBar from "./SearchBar.js";
import Controls from "./Controls.js";
import styled from "styled-components";
import RefreshIconButton from "../ui/IconButtons/RefreshIconButton.js";

const StyledControlBar = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.palette.boxBorder};
  background-color: ${({ theme }) => theme.palette.boxBackground};
  padding: ${({ theme }) => theme.controlBarPadding};
`;

const ControlBar = () => {
  return (
    <StyledControlBar>
      <Columns
        collapseMobile
        reverse
        space="small"
        justifyContent="space-between"
      >
        <Column width="content">
          <Columns space="small" justifyContent="space-between">
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
