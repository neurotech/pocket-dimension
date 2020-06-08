import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
    vertical-align: baseline;
    box-sizing: border-box;
    border: 0;
    outline: 0;
  }

  body {
    width: 100%;
    min-height: 100vh;
    font-family: ${({ theme }) => theme.fontFamily};
    background-color: ${({ theme }) => theme.bodyBackgroundColour};
  }
`;
