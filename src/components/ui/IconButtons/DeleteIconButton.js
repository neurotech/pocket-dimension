import React from "react";
import styled from "styled-components";
import Button from "./Button.js";
import Icon from "./Icon.js";
import CrossIcon from "heroicons/solid/x.svg";
import { useStore } from "../../../util/Store.js";
import {
  SET_STALE_ITEM,
  SET_IS_LOADING_OFF,
  SET_IS_LOADING_ON,
} from "../../../util/actionTypes.js";
import { deleteItem } from "../../../util/asyncActions.js";

const DeleteIcon = styled(Icon)`
  color: ${({ theme }) => theme.palette.iconText};
  &:hover {
    border-color: ${({ theme }) => theme.commonPalette.darkred};
    background-color: ${({ theme }) => theme.commonPalette.red};
    color: ${({ theme }) => theme.commonPalette.white};
  }
`;

const DeleteIconButton = ({ item }) => {
  const { dispatch } = useStore();

  return (
    <div>
      <Button
        onClick={async () => {
          dispatch({ type: SET_STALE_ITEM, payload: item.id });
          dispatch({ type: SET_IS_LOADING_ON });
          await deleteItem(item.id, item.timestamp);
          dispatch({ type: SET_IS_LOADING_OFF });
        }}
      >
        <DeleteIcon>
          <CrossIcon width={20} height={20} />
        </DeleteIcon>
      </Button>
    </div>
  );
};

export default DeleteIconButton;
