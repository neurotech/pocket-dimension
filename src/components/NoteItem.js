import React from "react";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";
import PaperClipIcon from "heroicons/outline/paper-clip.svg";
import ItemControls from "./ItemControls/ItemControls.js";
import { useStore } from "../util/Store";

const NoteItem = ({ item }) => {
  const { state } = useStore();

  const renderCodeBlock = (props) => {
    return <CodeBlock {...props} darkMode={state.darkMode} />;
  };

  return (
    <div>
      <PaperClipIcon width={20} height={20} />
      <div>Title: {item.title}</div>
      <ItemControls item={item} />
      <ReactMarkdown source={item.body} renderers={{ code: renderCodeBlock }} />
    </div>
  );
};

export default NoteItem;
