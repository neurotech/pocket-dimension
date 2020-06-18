import React from "react";
import styled from "styled-components";

const StyledTextArea = styled.textarea`
  resize: none;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  user-select: none;
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.fontSize}px;
  font-weight: 600;
  padding: ${({ theme }) => theme.inputPadding};
  background-color: ${({ theme }) => theme.inputBackground};
  border-radius: ${({ theme }) => theme.borderRadius};
  border-width: ${({ theme }) => theme.borderWidth}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.inputBorderColour};

  & ::placeholder {
    color: ${({ theme }) => theme.inputPlaceholderText};
  }

  &:focus {
    border-color: ${({ theme }) => theme.inputBorderColourFocus};
  }
`;

const TextArea = React.forwardRef((props, ref) => {
  return <StyledTextArea {...props} ref={ref}></StyledTextArea>;
});

export default TextArea;
