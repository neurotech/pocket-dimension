import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  padding: ${({ theme }) => theme.inputPadding};
  border-radius: ${({ theme }) => theme.borderRadius};

  & ::placeholder {
    color: ${({ theme }) => theme.inputPlaceholderText};
  }
`;

export const Input = () => {
  return <StyledInput />;
};
