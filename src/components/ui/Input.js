import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  user-select: none;
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.fontSize}px;
  font-weight: 600;
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
