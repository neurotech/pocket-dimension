import React from "react";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";
import BookIcon from "heroicons/outline/book-open.svg";
import ItemControls from "./ItemControls/ItemControls.js";
import { useStore } from "../util/Store";

const DiaryItem = ({ item }) => {
  const { state } = useStore();

  const renderCodeBlock = (props) => {
    return <CodeBlock {...props} darkMode={state.darkMode} />;
  };

  return (
    <div>
      <BookIcon width={20} height={20} />
      <div>Title: {item.title}</div>
      <ItemControls item={item} />
      <ReactMarkdown source={item.body} renderers={{ code: renderCodeBlock }} />
    </div>
  );
};

export default DiaryItem;
