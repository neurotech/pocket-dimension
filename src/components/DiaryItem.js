import React from "react";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";
import BookIcon from "heroicons/outline/book-open.svg";

const DiaryItem = ({ item, darkMode }) => {
  const renderCodeBlock = (props) => {
    return <CodeBlock {...props} darkMode={darkMode} />;
  };

  return (
    <div>
      <BookIcon width={20} height={20} />
      <div>Title: {item.title}</div>
      <ReactMarkdown source={item.body} renderers={{ code: renderCodeBlock }} />
    </div>
  );
};

export default DiaryItem;
