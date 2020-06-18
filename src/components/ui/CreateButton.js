import React from "react";
import styled from "styled-components";

const StyledCreateButton = styled.button`
  width: 100%;
  outline: none;
  cursor: pointer;
  user-select: none;
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ size }) => size};
  font-weight: 600;
  line-height: 0;
  padding: ${({ theme }) => theme.buttonPadding}rem;
  border-style: solid;
  border-radius: ${({ theme }) => theme.buttonBorderRadius};
  border-width: ${({ theme }) => theme.borderWidth}px;

  border-color: ${({ theme }) => theme.buttonBorder};
  background: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonText};

  &:hover {
    background: ${({ theme }) => theme.buttonBackgroundHover};
    color: ${({ theme }) => theme.buttonTextHover};
  }

  &:disabled {
    cursor: not-allowed;
    border-color: ${({ theme }) => theme.buttonBorderDisabled};
    background: ${({ theme }) => theme.buttonBackgroundDisabled};
    color: ${({ theme }) => theme.buttonTextDisabled};
  }
`;

const CreateButton = ({ disabled, onClick }) => {
  return (
    <StyledCreateButton disabled={disabled} onClick={onClick}>
      Create
    </StyledCreateButton>
  );
};

export default CreateButton;
