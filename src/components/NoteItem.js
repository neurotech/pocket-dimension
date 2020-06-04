import React from "react";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";
import PaperClipIcon from "heroicons/outline/paper-clip.svg";
import ItemControls from "./ItemControls/ItemControls.js";

const NoteItem = ({
  item,
  darkMode,
  handleArchiveItem,
  handleDeleteItem,
  handleEditItem,
  handleFocusItem,
}) => {
  const renderCodeBlock = (props) => {
    return <CodeBlock {...props} darkMode={darkMode} />;
  };

  return (
    <div>
      <PaperClipIcon width={20} height={20} />
      <div>Title: {item.title}</div>
      <ItemControls
        item={item}
        handleEditItem={handleEditItem}
        handleFocusItem={handleFocusItem}
        handleArchiveItem={handleArchiveItem}
        handleDeleteItem={handleDeleteItem}
      />
      <ReactMarkdown source={item.body} renderers={{ code: renderCodeBlock }} />
    </div>
  );
};

export default NoteItem;
