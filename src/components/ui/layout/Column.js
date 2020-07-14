import React, { useContext } from "react";
import { ColumnsContext } from "./Columns.js";
import styled, { css } from "styled-components";
import resolveSpaceToValue from "../../../util/resolveSpaceToValue.js";

const collapseMobileMixin = (space) => css`
  @media only screen and (max-width: 849px) {
    padding-top: ${resolveSpaceToValue(space)};
  }
`;

const StyledColumn = styled.div`
  min-width: 0;
  flex-shrink: ${(props) => (props.columnWidth === "content" ? 0 : 1)};
  flex-grow: ${(props) => (props.columnWidth === "fill" ? 1 : 0)};
  flex-basis: auto;
  padding-left: ${(props) => resolveSpaceToValue(props.space)};

  ${(props) =>
    props.collapseMobile ? collapseMobileMixin(props.space) : null};
`;

const Column = ({ width, children }) => {
  const { collapseMobile, space } = useContext(ColumnsContext);

  return (
    <StyledColumn
      collapseMobile={collapseMobile}
      columnWidth={width}
      space={space}
    >
      {children}
    </StyledColumn>
  );
};

export default Column;
