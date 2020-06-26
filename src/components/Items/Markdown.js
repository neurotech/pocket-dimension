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
    line-height: ${({ theme }) => theme.lineHeight + 2}px;
  }

  code {
    background-color: ${({ theme }) => theme.palette.codeBackground};
    border-radius: ${({ theme }) => theme.borderRadius};
    color: ${({ theme }) => theme.palette.codeText};
    padding: 2px 6px;
  }

  pre > code {
    padding: 0;
  }

  pre {
    border-radius: ${({ theme }) => theme.borderRadius};
    border-width: ${({ theme }) => theme.borderWidth}px;
    border-style: solid;
    border-color: ${({ theme }) => theme.palette.codeBlockBorder};
  }

  ul,
  ol {
    margin-left: ${({ theme }) => theme.listMargin};
  }
`;
export default StyledReactMarkdown;
