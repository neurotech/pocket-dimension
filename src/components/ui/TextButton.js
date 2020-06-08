import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  font-family: "Segoe UI";
  outline: none;
  background: ${({ theme }) => theme.buttonBackgroundColour};
  color: ${({ theme }) => theme.buttonTextColour};
`;

const Label = styled.div`
  padding: ${({ theme }) => theme.buttonPadding};
`;

const TextButton = ({ handleClick, label }) => {
  return (
    <StyledButton onClick={handleClick}>
      <Label>{label}</Label>
    </StyledButton>
  );
};

export default TextButton;
