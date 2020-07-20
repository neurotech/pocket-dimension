import React, { createContext } from "react";
import styled, { css } from "styled-components";
import resolveReverseToValue from "../../../util/resolveReverseToValue.js";
import resolveSpaceToValue from "../../../util/resolveSpaceToValue.js";

export const ColumnsContext = createContext({
  collapseMobile: false,
  space: "small",
});

const collapseMobileMixin = (flow, space, reverse) => css`
  @media only screen and (max-width: 849px) {
    align-items: stretch;
    flex-direction: ${resolveReverseToValue(
      flow === "wrap" ? "row" : "column",
      reverse
    )};
    margin-top: -${resolveSpaceToValue(space)};
  }
`;

const StyledColumns = styled.div`
  display: flex;
  flex-direction: ${(props) => resolveReverseToValue("row", props.reverse)};
  flex-flow: ${(props) => props.flow};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "flex-start"};
  align-items: ${(props) => props.alignItems};
  margin-left: -${(props) => resolveSpaceToValue(props.space)};
  overflow-wrap: break-word;
  cursor: ${(props) => (props.onClick ? "pointer" : "default")};

  ${(props) =>
    props.collapseMobile
      ? collapseMobileMixin(props.flow, props.space, props.reverse)
      : null};
`;

const Columns = ({
  alignItems = "center",
  children,
  collapseMobile = false,
  flow = "inherit",
  justifyContent,
  onClick,
  reverse = false,
  space,
}) => {
  return (
    <StyledColumns
      alignItems={alignItems}
      collapseMobile={collapseMobile}
      flow={flow}
      justifyContent={justifyContent}
      onClick={onClick}
      reverse={reverse}
      space={space}
    >
      <ColumnsContext.Provider value={{ collapseMobile, space }}>
        {children}
      </ColumnsContext.Provider>
    </StyledColumns>
  );
};

export default Columns;
