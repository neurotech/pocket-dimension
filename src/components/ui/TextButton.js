import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 100%;
  outline: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.fontSize * 1.3}px;
  font-weight: 600;
  border-style: solid;
  line-height: 0;
  border-radius: ${({ theme }) => theme.buttonBorderRadius};
  border-width: ${({ theme }) => theme.borderWidth}px;
  border-color: ${({ theme }) => theme.buttonBorder};
  background: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonText};
  padding-top: ${({ theme }) => theme.buttonPadding * 1.5}rem;
  padding-right: 0;
  padding-bottom: ${({ theme }) => theme.buttonPadding * 1.5}rem;
  padding-left: 0;

  & :hover {
    background: ${({ theme }) => theme.buttonBackgroundHover};
    color: ${({ theme }) => theme.buttonTextHover};
  }
`;

const Label = styled.div``;

const TextButton = ({ handleClick, label }) => {
  return (
    <StyledButton onClick={handleClick}>
      <Label>{label}</Label>
    </StyledButton>
  );
};

export default TextButton;
