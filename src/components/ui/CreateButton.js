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
  border-radius: ${({ theme }) => theme.borderRadius};
  border-width: ${({ theme }) => theme.borderWidth}px;

  border-color: ${({ theme }) => theme.commonPalette.heavyblue};
  background: ${({ theme }) => theme.commonPalette.blue};
  color: ${({ theme }) => theme.commonPalette.white};

  transition: transform 0.15s, border-color 0.15s, background-color 0.15s,
    color 0.15s;

  &:hover {
    background: ${({ theme }) => theme.commonPalette.lightblue};
    color: ${({ theme }) => theme.commonPalette.heavyblue};
  }

  &:disabled {
    cursor: not-allowed;
    border-color: ${({ theme }) => theme.palette.disabledInputBorder};
    background: ${({ theme }) => theme.palette.disabledInputBackground};
    color: ${({ theme }) => theme.palette.disabledInputText};
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
