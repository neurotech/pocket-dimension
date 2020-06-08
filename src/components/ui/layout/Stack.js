import React, { Children } from "react";
import flattenChildren from "react-keyed-flatten-children";
import styled from "styled-components";
import resolveSpaceToValue from "./resolveSpaceToValue";
import Box from "./Box";

const StyledStack = styled.div`
  display: flex;
  flex-direction: column;
`;

const Stack = ({ space = "none", children }) => {
  const stackItems = flattenChildren(children);

  return (
    <StyledStack space={space}>
      {Children.map(stackItems, (child) => {
        return <Box space={space}>{child}</Box>;
      })}
    </StyledStack>
  );
};

export default Stack;
