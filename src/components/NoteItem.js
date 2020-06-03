import React from "react";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";
import EditItemButton from "./ItemControls/EditItemButton.js";
import ArchiveItemButton from "./ItemControls/ArchiveItemButton.js";
import DeleteItemButton from "./ItemControls/DeleteItemButton.js";
import PaperClipIcon from "heroicons/outline/paper-clip.svg";

const NoteItem = ({
  item,
  darkMode,
  handleArchiveItem,
  handleDeleteItem,
  handleEditItem,
}) => {
  const renderCodeBlock = (props) => {
    return <CodeBlock {...props} darkMode={darkMode} />;
  };

  return (
    <div>
      <PaperClipIcon width={20} height={20} />
      <div>Title: {item.title}</div>
      <EditItemButton item={item} handleEditItem={handleEditItem} />
      <ArchiveItemButton item={item} handleArchiveItem={handleArchiveItem} />
      <DeleteItemButton item={item} handleDeleteItem={handleDeleteItem} />
      <ReactMarkdown source={item.body} renderers={{ code: renderCodeBlock }} />
    </div>
  );
};

export default NoteItem;
