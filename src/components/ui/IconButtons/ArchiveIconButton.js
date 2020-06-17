import React from "react";
import styled from "styled-components";
import Button from "./Button.js";
import Icon from "./Icon.js";
import BoxIcon from "heroicons/solid/archive.svg";
import {
  SET_IS_LOADING_ON,
  SET_IS_LOADING_OFF,
  SET_STALE_ITEM,
} from "../../../util/actionTypes.js";
import { useStore } from "../../../util/Store.js";
import { updateItem } from "../../../util/asyncActions.js";

const ArchiveIcon = styled(Icon)`
  color: ${({ theme }) => theme.iconButtonBorder};
  &:hover {
    border-color: ${({ theme }) => theme.archiveIconButtonBorderHover};
    background-color: ${({ theme }) => theme.archiveIconButtonBackgroundHover};
    color: ${({ theme }) => theme.archiveIconButtonTextHover};
  }
`;

const ArchiveIconButton = ({ item }) => {
  const { dispatch } = useStore();

  return (
    <div>
      <Button
        onClick={async () => {
          dispatch({ type: SET_STALE_ITEM, payload: item.id });
          dispatch({ type: SET_IS_LOADING_ON });
          item.isArchived = !item.isArchived;
          await updateItem(item);
          dispatch({ type: SET_IS_LOADING_OFF });
        }}
      >
        <ArchiveIcon>
          <BoxIcon width={20} height={20} />
        </ArchiveIcon>
      </Button>
    </div>
  );
};

export default ArchiveIconButton;
