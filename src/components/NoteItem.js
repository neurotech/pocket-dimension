import React from "react";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";
import DeleteItemButton from "./ItemControls/DeleteItemButton.js";
import PaperClipIcon from "heroicons/outline/paper-clip.svg";

const NoteItem = ({ item, theme, handleDeleteItem }) => {
  const renderCodeBlock = (props) => {
    return <CodeBlock {...props} theme={theme} />;
  };

  return (
    <div>
      <PaperClipIcon width={20} height={20} />
      <div>Title: {item.title}</div>
      <DeleteItemButton item={item} handleDeleteItem={handleDeleteItem} />
      <ReactMarkdown source={item.body} renderers={{ code: renderCodeBlock }} />
    </div>
  );
};

export default NoteItem;
