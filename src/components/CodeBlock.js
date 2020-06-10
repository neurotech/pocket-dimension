import React from "react";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  duotoneEarth as dark,
  duotoneLight as light,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import csharp from "react-syntax-highlighter/dist/esm/languages/prism/csharp";
import js from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import lua from "react-syntax-highlighter/dist/esm/languages/prism/lua";
import shell from "react-syntax-highlighter/dist/esm/languages/prism/bash";

SyntaxHighlighter.registerLanguage("csharp", csharp);
SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("lua", lua);
SyntaxHighlighter.registerLanguage("shell", shell);

const CodeBlock = ({ language, value, darkMode }) => {
  return (
    <SyntaxHighlighter
      language={language || "text"}
      style={darkMode ? dark : light}
    >
      {value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
