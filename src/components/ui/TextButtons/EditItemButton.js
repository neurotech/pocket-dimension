import React from "react";
import styled from "styled-components";
import TextButton from "../TextButton.js";
import {
  FILTER_TEXT_CHANGED,
  SET_ITEM_DIALOG_OPEN,
} from "../../../util/actionTypes.js";
import { useStore } from "../../../util/Store.js";

const StyledTextButton = styled(TextButton)`
  padding: 0.75rem 0.5rem;
  border-color: ${({ theme }) => theme.palette.iconBorder};
  background-color: ${({ theme }) => theme.palette.iconBackground};
  color: ${({ theme }) => theme.palette.iconText};
  &:hover {
    border-color: ${({ theme }) => theme.commonPalette.darkpink};
    background-color: ${({ theme }) => theme.commonPalette.pink};
    color: ${({ theme }) => theme.commonPalette.white};
  }
`;

const EditItemButton = ({ item }) => {
  const { dispatch } = useStore();

  return (
    <StyledTextButton
      label={"Edit"}
      title={"Edit this item"}
      onClick={() => {
        dispatch({ type: SET_ITEM_DIALOG_OPEN, payload: item });
      }}
    />
  );
};

export default EditItemButton;
