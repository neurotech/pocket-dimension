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
  color: ${({ theme }) => theme.palette.searchBarPlaceholder};

  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: 600;

  ::placeholder {
    color: ${({ theme }) => theme.palette.searchBarPlaceholder};
  }

  & :focus {
    border-color: ${({ theme }) => theme.palette.searchBarBorderFocus};
    background-color: ${({ theme }) => theme.palette.searchBarBackgroundFocus};
    color: ${({ theme }) => theme.palette.searchBarPlaceholderFocus};

    ::placeholder {
      color: transparent;
    }
  }
`;

const SearchBar = () => {
  const { state, dispatch } = useStore();

  return (
    <StyledInput
      autoFocus
      autocomplete={"off"}
      onChange={(event) => {
        dispatch({
          type: FILTER_TEXT_CHANGED,
          payload: event ? event.target.value : "",
        });
      }}
      placeholder="Search"
      type="search"
      value={state.filterText || ""}
    ></StyledInput>
  );
};

export default SearchBar;
