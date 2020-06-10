import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  outline: none;
  cursor: pointer;
  font-family: "Segoe UI";
  font-weight: 600;
  border-style: solid;
  line-height: 0;
  border-radius: ${({ theme }) => theme.buttonBorderRadius};
  border-width: ${({ theme }) => theme.borderWidth}px;
  border-color: ${({ theme }) => theme.buttonBorder};
  background: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonText};

  & :hover {
    background: ${({ theme }) => theme.buttonBackgroundHover};
    color: ${({ theme }) => theme.buttonTextHover};
  }
`;

const Label = styled.div`
  padding: ${({ theme }) => theme.buttonPadding};
`;

const TextButton = ({ handleClick, label, variant = "none" }) => {
  return (
    <StyledButton onClick={handleClick} variant={variant}>
      <Label>{label}</Label>
    </StyledButton>
  );
};

export default TextButton;
