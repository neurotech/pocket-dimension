import React from "react";
import styled from "styled-components";
import resolveSpaceToValue from "../../../util/resolveSpaceToValue.js";

const StyledBox = styled.div`
  padding-bottom: ${(props) => resolveSpaceToValue(props.space)};
`;

const Box = ({ space = "none", children }) => {
  return <StyledBox space={space}>{children}</StyledBox>;
};
export default Box;
