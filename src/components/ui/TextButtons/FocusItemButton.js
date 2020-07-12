import React from "react";
import styled from "styled-components";
import TextButton from "../TextButton.js";
import { FILTER_TEXT_CHANGED } from "../../../util/actionTypes.js";
import { useStore } from "../../../util/Store.js";

const StyledTextButton = styled(TextButton)`
  padding: 0.75rem 0.5rem;
  border-color: ${({ theme }) => theme.palette.iconBorder};
  background-color: ${({ theme }) => theme.palette.iconBackground};
  color: ${({ theme }) => theme.palette.iconText};
  &:hover {
    border-color: ${({ theme }) => theme.commonPalette.darkpurple};
    background-color: ${({ theme }) => theme.commonPalette.purple};
    color: ${({ theme }) => theme.commonPalette.white};
  }
`;

const FocusIconButton = ({ title }) => {
  const { dispatch } = useStore();

  return (
    <StyledTextButton
      label={"Focus"}
      onClick={() => {
        dispatch({ type: FILTER_TEXT_CHANGED, payload: title });
      }}
    />
  );
};

export default FocusIconButton;
