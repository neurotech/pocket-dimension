import React from "react";
import styled from "styled-components";
import resolveSizeToFontSize from "../../util/resolveSizeToFontSize.js";

const StyledButton = styled.button`
  outline: none;
  cursor: pointer;
  user-select: none;
  padding: ${({ theme }) => theme.buttonPadding}rem;
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ size }) => size};
  line-height: 4px;
  font-weight: 600;
  border-style: solid;
  border-radius: ${({ theme }) => theme.borderRadius};
  border-width: ${({ theme }) => theme.borderWidth}px;

  border-color: ${({ theme }) => theme.commonPalette.heavyblue};
  background: ${({ theme }) => theme.commonPalette.blue};
  color: ${({ theme }) => theme.commonPalette.white};

  transition: transform 0.15s, border-color 0.15s, background-color 0.15s,
    color 0.15s;

  & :hover {
    background: ${({ theme }) => theme.commonPalette.lightblue};
    color: ${({ theme }) => theme.commonPalette.heavyblue};
  }

  & :disabled {
    cursor: not-allowed;
    border-color: ${({ theme }) => theme.palette.disabledInputBorder};
    background: ${({ theme }) => theme.palette.disabledInputBackground};
    color: ${({ theme }) => theme.palette.disabledInputText};
  }
`;

const Label = styled.div`
  display: inline;
`;

const TextButton = ({
  className,
  size = "normal",
  disabled = false,
  onClick,
  label,
  title,
}) => {
  return (
    <StyledButton
      className={className}
      size={resolveSizeToFontSize(size)}
      disabled={disabled}
      onClick={onClick}
      title={title}
    >
      <Label>{label}</Label>
    </StyledButton>
  );
};

export default TextButton;
