import React from "react";
import styled from "styled-components";
import resolveSpaceToValue from "../../../util/resolveSpaceToValue.js";

const StyledBox = styled.div`
  flex-grow: ${(props) => props.flexGrow};
  flex-shrink: ${(props) => props.flexShrink};
  padding-bottom: ${(props) => resolveSpaceToValue(props.space)};
`;

const Box = ({ space = "none", flexGrow = 0, flexShrink = 0, children }) => {
  return (
    <StyledBox space={space} flexGrow={flexGrow} flexShrink={flexShrink}>
      {children}
    </StyledBox>
  );
};
export default Box;
