import React from "react";
import styled from "styled-components";

const StyledCancelButton = styled.button`
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

  border-color: ${({ theme }) => theme.commonPalette.darkorange};
  background: ${({ theme }) => theme.commonPalette.orange};
  color: ${({ theme }) => theme.commonPalette.white};

  transition: transform 0.15s, border-color 0.15s, background-color 0.15s,
    color 0.15s;

  &:hover {
    background: ${({ theme }) => theme.commonPalette.lightorange};
    color: ${({ theme }) => theme.commonPalette.darkorange};
  }

  &:disabled {
    cursor: not-allowed;
    border-color: ${({ theme }) => theme.palette.disabledInputBorder};
    background: ${({ theme }) => theme.palette.disabledInputBackground};
    color: ${({ theme }) => theme.palette.disabledInputText};
  }
`;

const CancelButton = ({ disabled, onClick }) => {
  return (
    <StyledCancelButton disabled={disabled} onClick={onClick}>
      Cancel
    </StyledCancelButton>
  );
};

export default CancelButton;
