import React from "react";
import styled, { keyframes, css } from "styled-components";
import { useStore } from "../../../util/Store.js";
import Button from "./Button.js";
import Icon from "./Icon.js";
import DoubleArrowsIcon from "heroicons/solid/refresh.svg";
import {
  SET_IS_LOADING_ON,
  FETCH_ACTIVE_ITEMS_COMPLETE,
  FETCH_ARCHIVED_ITEMS_COMPLETE,
} from "../../../util/actionTypes.js";
import { fetchItems } from "../../../util/asyncActions.js";

const rotate = keyframes`
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0deg);
  }
`;

const rotationMixin = css`
  animation: ${rotate} 2s linear infinite;
`;

const RefreshIcon = styled(Icon)`
  background-color: ${({ theme }) => theme.refreshIconButtonBackground};
  border-color: ${({ theme }) => theme.refreshIconButtonBorder};
  color: ${({ theme }) => theme.refreshIconButtonText};
  &:hover {
    border-color: ${({ theme }) => theme.refreshIconButtonBorderHover};
    background-color: ${({ theme }) => theme.refreshIconButtonBackgroundHover};
    color: ${({ theme }) => theme.refreshIconButtonTextHover};
  }
  & svg {
    ${(props) => (props.isLoading ? rotationMixin : "animation: none")};
  }
`;

const RefreshIconButton = () => {
  const { state, dispatch } = useStore();

  return (
    <div>
      <Button
        onClick={async () => {
          dispatch({ type: SET_IS_LOADING_ON });
          let items = await fetchItems(state.archiveMode);
          let complete = state.archiveMode
            ? FETCH_ARCHIVED_ITEMS_COMPLETE
            : FETCH_ACTIVE_ITEMS_COMPLETE;
          dispatch({ type: complete, payload: items });
        }}
      >
        <RefreshIcon isLoading={state.isLoading}>
          <DoubleArrowsIcon width={20} height={20} />
        </RefreshIcon>
      </Button>
    </div>
  );
};

export default RefreshIconButton;