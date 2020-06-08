import React, { createContext } from "react";
import styled from "styled-components";
import resolveSpaceToValue from "./resolveSpaceToValue.js";

export const ColumnsContext = createContext({ space: "small" });

const StyledColumns = styled.div`
  display: flex;
  flex-direction: row;
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "flex-start"};
  margin-left: -${(props) => resolveSpaceToValue(props.space)};
`;

const Columns = ({
  alignItems = "center",
  space,
  justifyContent,
  children,
}) => {
  return (
    <StyledColumns
      alignItems={alignItems}
      space={space}
      justifyContent={justifyContent}
    >
      <ColumnsContext.Provider value={{ space }}>
        {children}
      </ColumnsContext.Provider>
    </StyledColumns>
  );
};

export default Columns;
