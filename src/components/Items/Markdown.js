import ReactMarkdown from "react-markdown";
import styled from "styled-components";

const StyledReactMarkdown = styled(ReactMarkdown)`
  font-size: ${({ theme }) => theme.fontSize + 2}px;
  line-height: ${({ theme }) => theme.lineHeight + 2}px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: ${({ theme }) => theme.fontSize + 2}px;
    line-height: ${({ theme }) => theme.lineHeight + 2}px;
  }

  code {
    padding: ${({ theme }) => theme.codePadding};
    background-color: ${({ theme }) => theme.codeBackground};
    border-radius: ${({ theme }) => theme.codeBorderRadius};
  }

  pre {
    margin: 0 !important;
    border-radius: ${({ theme }) => theme.codeBorderRadius};
  }
`;
export default StyledReactMarkdown;
