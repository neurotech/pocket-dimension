import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
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
