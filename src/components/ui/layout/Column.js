import React, { useContext } from "react";
import { ColumnsContext } from "./Columns.js";
import styled from "styled-components";
import convertSpaceToValue from "./convertSpaceToValue.js";

const Column = ({ children }) => {
  const { space } = useContext(ColumnsContext);

  const StyledColumn = styled.div`
    margin: 0;
    padding: 0;
    border: 0;
    padding-left: ${convertSpaceToValue(space)};
  `;

  return <StyledColumn>{children}</StyledColumn>;
};

export default Column;
