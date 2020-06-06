import React, { createContext } from "react";
import styled from "styled-components";
import convertSpaceToValue from "./convertSpaceToValue.js";

export const ColumnsContext = createContext({ space: "small" });

const Columns = ({ space, justifyContent, children }) => {
  const StyledColumns = styled.div`
    margin: 0;
    padding: 0;
    border: 0;
    display: flex;
    flex-direction: row;
    justify-content: ${justifyContent ? justifyContent : "flex-start"};
    margin-left: -${convertSpaceToValue(space)};
  `;

  return (
    <StyledColumns>
      <ColumnsContext.Provider value={{ space }}>
        {children}
      </ColumnsContext.Provider>
    </StyledColumns>
  );
};

export default Columns;
