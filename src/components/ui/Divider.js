import React from "react";
import styled from "styled-components";

const Line = styled.hr`
  height: ${({ theme }) => theme.borderWidth}px;
  background-color: ${({ theme }) => theme.palette.divider};
`;

const Divider = () => {
  return <Line />;
};

export default Divider;
