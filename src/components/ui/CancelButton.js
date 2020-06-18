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
  border-radius: ${({ theme }) => theme.buttonBorderRadius};
  border-width: ${({ theme }) => theme.borderWidth}px;

  border-color: ${({ theme }) => theme.cancelButtonBorder};
  background: ${({ theme }) => theme.cancelButtonBackground};
  color: ${({ theme }) => theme.cancelButtonText};

  &:hover {
    background: ${({ theme }) => theme.cancelButtonBackgroundHover};
    color: ${({ theme }) => theme.cancelButtonTextHover};
  }

  &:disabled {
    cursor: not-allowed;
    border-color: ${({ theme }) => theme.buttonBorderDisabled};
    background: ${({ theme }) => theme.buttonBackgroundDisabled};
    color: ${({ theme }) => theme.buttonTextDisabled};
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
