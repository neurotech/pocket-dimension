import ReactMarkdown from "react-markdown";
import styled from "styled-components";

const StyledReactMarkdown = styled(ReactMarkdown)`
  font-size: ${({ theme }) => theme.fontSize + 2}px;
  line-height: ${({ theme }) => theme.lineHeight}px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: ${({ theme }) => theme.fontSize + 2}px;
    font-weight: 600;
    line-height: ${({ theme }) => theme.lineHeight + 2}px;
    margin-bottom: 0.5rem;
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSize + 12}px;
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSize + 10}px;
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSize + 8}px;
  }

  h4 {
    font-size: ${({ theme }) => theme.fontSize + 6}px;
  }

  h5 {
    font-size: ${({ theme }) => theme.fontSize + 4}px;
  }

  h6 {
    font-size: ${({ theme }) => theme.fontSize + 2}px;
  }

  p {
    margin-bottom: 0.5rem;
  }

  a {
    overflow-wrap: break-word;
  }

  code {
    background-color: ${({ theme }) => theme.palette.codeBackground};
    border-radius: ${({ theme }) => theme.borderRadius};
    color: ${({ theme }) => theme.palette.codeText};
    padding: 2px 6px;
    overflow-wrap: break-word;
  }

  pre > code {
    padding: 0;
  }

  pre {
    border-radius: ${({ theme }) => theme.borderRadius};
    border-width: ${({ theme }) => theme.borderWidth}px;
    border-style: solid;
    border-color: ${({ theme }) => theme.palette.codeBlockBorder};
    overflow-wrap: break-word;
  }

  ul,
  ol {
    margin-left: ${({ theme }) => theme.listMargin};
  }

  blockquote {
    border-left-width: ${({ theme }) => theme.borderWidth * 2}px;
    border-left-style: solid;
    border-left-color: ${({ theme }) => theme.palette.blockQuoteBorder};
    padding-left: ${({ theme }) => theme.blockQuotePadding};
  }

  hr {
    height: ${({ theme }) => theme.borderWidth}px;
    background-color: ${({ theme }) => theme.palette.horizontalRule};
    margin: ${({ theme }) => theme.horizontalRuleMargin} 0;
  }
`;
export default StyledReactMarkdown;
