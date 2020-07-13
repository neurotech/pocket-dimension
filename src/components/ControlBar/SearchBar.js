import React, { useState } from "react";
import styled from "styled-components";
import { FILTER_TEXT_CHANGED } from "../../util/actionTypes";
import { useStore } from "../../util/Store";
import TextButton from "../ui/TextButton";

const StyledInput = styled.input`
  outline: 0;
  width: 100%;
  padding: ${({ theme }) => theme.searchBarPadding};
  border-top-left-radius: ${({ theme }) => theme.borderRadius};
  border-top-right-radius: 0;
  border-bottom-left-radius: ${({ theme }) => theme.borderRadius};
  border-bottom-right-radius: 0;

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

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const StyledTextButton = styled(TextButton)`
  border-top-left-radius: 0;
  border-top-right-radius: ${({ theme }) => theme.borderRadius};
  border-bottom-left-radius: 0;
  border-bottom-right-radius: ${({ theme }) => theme.borderRadius};
  margin-left: -${({ theme }) => theme.borderWidth}px;

  border: 2px solid
    ${({ theme, searchBarFocus }) =>
      searchBarFocus
        ? theme.palette.clearSearchBarBorderFocus
        : theme.palette.clearSearchBarBorder};
  background-color: ${({ theme, searchBarFocus }) =>
    searchBarFocus
      ? theme.palette.clearSearchBarBackgroundFocus
      : theme.palette.clearSearchBarBackground};
  color: ${({ theme, searchBarFocus }) =>
    searchBarFocus
      ? theme.palette.clearSearchBarPlaceholderFocus
      : theme.palette.clearSearchBarPlaceholder};

  &:hover {
    background-color: ${({ theme, searchBarFocus }) =>
      searchBarFocus
        ? theme.palette.clearSearchBarBackgroundHover
        : theme.palette.clearSearchBarBackground};

    color: ${({ theme, searchBarFocus }) =>
      searchBarFocus
        ? theme.palette.clearSearchBarHover
        : theme.palette.clearSearchBarPlaceholder};
  }
`;

const SearchBar = () => {
  const { state, dispatch } = useStore();
  const [searchBarFocus, setSearchBarFocus] = useState(false);

  return (
    <Container>
      <StyledInput
        autocomplete={"off"}
        onChange={(event) => {
          dispatch({
            type: FILTER_TEXT_CHANGED,
            payload: event ? event.target.value : "",
          });
        }}
        placeholder="Search"
        value={state.filterText || ""}
        onFocus={() => setSearchBarFocus(true)}
        onBlur={() => setSearchBarFocus(false)}
      ></StyledInput>
      <StyledTextButton
        size="large"
        label="Clear"
        searchBarFocus={searchBarFocus}
        onClick={() => {
          dispatch({
            type: FILTER_TEXT_CHANGED,
            payload: "",
          });
        }}
      />
    </Container>
  );
};

export default SearchBar;
