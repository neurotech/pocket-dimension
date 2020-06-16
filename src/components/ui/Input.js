import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  font-family: ${({ theme }) => theme.fontFamily};
  padding: ${({ theme }) => theme.inputPadding};
  background-color: ${({ theme }) => theme.inputBackground};
  border-radius: ${({ theme }) => theme.borderRadius};
  border-width: ${({ theme }) => theme.borderWidth}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.inputBorderColour};

  & ::placeholder {
    color: ${({ theme }) => theme.inputPlaceholderText};
  }
`;
