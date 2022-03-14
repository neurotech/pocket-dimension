import React from "react";
import styled from "styled-components";

const StyledTextArea = styled.textarea`
  resize: none;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  user-select: text;
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.inputFontSize}px;
  font-weight: 400;
  padding: ${({ theme }) => theme.inputPadding};
  border-radius: ${({ theme }) => theme.borderRadius};
  border-width: ${({ theme }) => theme.borderWidth}px;
  border-style: solid;

  border-color: ${({ theme }) => theme.palette.inputBorder};
  background-color: ${({ theme }) => theme.palette.inputBackground};
  color: ${({ theme }) => theme.palette.inputText};

  & ::placeholder {
    color: ${({ theme }) => theme.palette.inputPlaceholder};
  }

  &:focus {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.palette.inputShadowFocus}75;
    border-color: ${({ theme }) => theme.palette.inputBorderFocus};
    & ::placeholder {
      color: transparent;
    }
  }

  & :disabled {
    cursor: not-allowed;
    border-color: ${({ theme }) => theme.palette.disabledInputBorder};
    background: ${({ theme }) => theme.palette.disabledInputBackground};
    color: ${({ theme }) => theme.palette.disabledInputText};
  }
`;

const TextArea = React.forwardRef((props, ref) => {
  return <StyledTextArea {...props} ref={ref}></StyledTextArea>;
});

export default TextArea;
