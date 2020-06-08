import React from "react";
import styled from "styled-components";

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
    color: ${({ theme }) => theme.searchBarTextFocus};

    ::placeholder {
      color: ${({ theme }) => theme.searchBarTextFocus};
    }
  }
`;

const SearchBar = ({ filterText, handleItemFilter }) => {
  return (
    <StyledInput
      type="text"
      autoFocus
      placeholder="Search"
      onChange={handleItemFilter}
      value={filterText || ""}
    ></StyledInput>
  );
};

export default SearchBar;
