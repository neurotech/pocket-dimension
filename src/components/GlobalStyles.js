import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    vertical-align: baseline;
    box-sizing: border-box;
    border: 0;
    outline: 0;
  }

  ::selection {
    background: ${({ theme }) => theme.commonPalette.pink};
    color: ${({ theme }) => theme.commonPalette.white};
  }
  
  ::-moz-selection {
    background: ${({ theme }) => theme.commonPalette.pink};
    color: ${({ theme }) => theme.commonPalette.white};
  }

  body {
    width: 100%;
    min-height: 100vh;
    font-family: ${({ theme }) => theme.fontFamily};
    background-color: ${({ theme }) => theme.bodyBackground};
  }

  a, a:visited {
    padding: ${({ theme }) => theme.linkPadding};
    color: ${({ theme }) => theme.palette.link};
  }

  a:hover {
    border-radius: ${({ theme }) => theme.borderRadius};
    background-color: ${({ theme }) => theme.palette.linkBackgroundHover};
    color: ${({ theme }) => theme.palette.linkHover};
  }
`;
