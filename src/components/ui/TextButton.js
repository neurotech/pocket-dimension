import React from "react";
import styled from "styled-components";
import resolveSizeToFontSize from "../../util/resolveSizeToFontSize.js";

const StyledButton = styled.button`
  width: 100%;
  outline: none;
  cursor: pointer;
  user-select: none;
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ size }) => size};
  font-weight: 600;
  line-height: 0;
  border-style: solid;
  border-radius: ${({ theme }) => theme.buttonBorderRadius};
  border-width: ${({ theme }) => theme.borderWidth}px;
  border-color: ${({ theme }) => theme.buttonBorder};
  background: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonText};
  padding: ${({ theme }) => theme.buttonPadding}rem;

  & :hover {
    background: ${({ theme }) => theme.buttonBackgroundHover};
    color: ${({ theme }) => theme.buttonTextHover};
  }

  & :disabled {
    cursor: not-allowed;
    background: ${({ theme }) => theme.buttonBackground};
    color: ${({ theme }) => theme.buttonText};
  }
`;

const Label = styled.div``;

const TextButton = ({ size = "normal", disabled = false, onClick, label }) => {
  return (
    <StyledButton
      size={resolveSizeToFontSize(size)}
      disabled={disabled}
      onClick={onClick}
    >
      <Label>{label}</Label>
    </StyledButton>
  );
};

export default TextButton;
