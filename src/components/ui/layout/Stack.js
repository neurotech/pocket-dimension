import React, { Children } from "react";
import flattenChildren from "react-keyed-flatten-children";
import styled from "styled-components";
import resolveSpaceToValue from "./resolveSpaceToValue";
import Box from "./Box";

const StyledStack = styled.div`
  display: flex;
  flex-direction: column;
  > :last-child {
    padding-bottom: ${(props) =>
      props.padLastChild ? resolveSpaceToValue(props.space) : 0};
  }
`;

const Stack = ({ space = "none", padLastChild = false, children }) => {
  const stackItems = flattenChildren(children);

  return (
    <StyledStack space={space} padLastChild={padLastChild}>
      {Children.map(stackItems, (child) => {
        return <Box space={space}>{child}</Box>;
      })}
    </StyledStack>
  );
};

export default Stack;
