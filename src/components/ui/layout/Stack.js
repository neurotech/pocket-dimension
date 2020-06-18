import React, { Children } from "react";
import flattenChildren from "react-keyed-flatten-children";
import styled from "styled-components";
import resolveSpaceToValue from "../../../util/resolveSpaceToValue";
import Box from "./Box";

const StyledStack = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: ${(props) => props.flexGrow};
  flex-shrink: ${(props) => props.flexShrink};
  justify-content: ${(props) => props.justifyContent};
  > :last-child {
    padding-bottom: ${(props) =>
      props.padLastChild ? resolveSpaceToValue(props.space) : 0};
  }
`;

const Stack = ({
  space = "none",
  padLastChild = false,
  flexGrow = 0,
  flexShrink = 0,
  justifyContent = "unset",
  children,
}) => {
  const stackItems = flattenChildren(children);

  return (
    <StyledStack
      space={space}
      padLastChild={padLastChild}
      flexGrow={flexGrow}
      flexShrink={flexShrink}
      justifyContent={justifyContent}
    >
      {Children.map(stackItems, (child) => {
        let stretch = child.props && child.props.stretch ? 1 : 0;
        return (
          <Box flexGrow={stretch} flexShrink={stretch} space={space}>
            {child}
          </Box>
        );
      })}
    </StyledStack>
  );
};

export default Stack;
