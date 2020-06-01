import React from "react";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";

const DiaryItem = ({ item, theme }) => {
  const renderCodeBlock = (props) => {
    return <CodeBlock {...props} theme={theme} />;
  };

  return (
    <div>
      <div>Title: {item.title}</div>
      <ReactMarkdown source={item.body} renderers={{ code: renderCodeBlock }} />
    </div>
  );
};

export default DiaryItem;
