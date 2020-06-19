import React from "react";
import styled from "styled-components";
import { FILTER_TEXT_CHANGED } from "../../util/actionTypes";
import { useStore } from "../../util/Store";

const StyledInput = styled.input`
  outline: 0;
  width: 100%;
  padding: ${({ theme }) => theme.searchBarPadding};
  border-radius: ${({ theme }) => theme.borderRadius};

  border: 2px solid ${({ theme }) => theme.palette.searchBarBorder};
  background-color: ${({ theme }) => theme.palette.searchBarBackground};

  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: 600;

  ::placeholder {
    color: ${({ theme }) => theme.palette.searchBarPlaceholder};
  }

  & :focus {
    border-color: ${({ theme }) => theme.commonPalette.pink};
    background-color: ${({ theme }) => theme.commonPalette.palepink};
    color: ${({ theme }) => theme.commonPalette.darkpink};

    ::placeholder {
      color: transparent;
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
