import React from "react";
import styled from "styled-components";
import { FILTER_TEXT_CHANGED } from "../../util/actionTypes";
import { useStore } from "../../util/Store";

const StyledInput = styled.input`
  outline: 0;
  width: 100%;
  padding: ${({ theme }) => theme.searchBarPadding};
  border: 2px solid ${({ theme }) => theme.searchBarBorderColour};
  border-radius: ${({ theme }) => theme.searchBarBorderRadius};
  background-color: ${({ theme }) => theme.searchBarBackgroundColour};
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: 600;

  ::placeholder {
    color: ${({ theme }) => theme.searchBarTextPlaceholder};
  }

  & :focus {
    border-color: ${({ theme }) => theme.searchBarBorderFocus};
    background-color: ${({ theme }) => theme.searchBarBackgroundFocus};
    color: ${({ theme }) => theme.searchBarTextFocus};

    ::placeholder {
      color: ${({ theme }) => theme.searchBarTextFocus};
    }
  }
`;

const SearchBar = () => {
  const { state, dispatch } = useStore();

  return (
    <StyledInput
      type="text"
      autoFocus
      placeholder="Search"
      onChange={(event) => {
        dispatch({
          type: FILTER_TEXT_CHANGED,
          payload: event ? event.target.value : "",
        });
      }}
      value={state.filterText || ""}
    ></StyledInput>
  );
};

export default SearchBar;
