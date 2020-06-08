import React, { useContext } from "react";
import { ColumnsContext } from "./Columns.js";
import styled from "styled-components";
import resolveSpaceToValue from "./resolveSpaceToValue.js";

const StyledColumn = styled.div`
  min-width: 0;
  flex-shrink: ${(props) => (props.columnWidth === "content" ? 0 : 1)};
  flex-grow: ${(props) => (props.columnWidth === "fill" ? 1 : 0)};
  flex-basis: auto;
  padding-left: ${(props) => resolveSpaceToValue(props.space)};
`;

const Column = ({ width, children }) => {
  const { space } = useContext(ColumnsContext);

  return (
    <StyledColumn columnWidth={width} space={space}>
      {children}
    </StyledColumn>
  );
};

export default Column;
