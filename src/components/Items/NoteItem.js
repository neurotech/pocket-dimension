import React from "react";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../CodeBlock.js";
import PaperClipIcon from "heroicons/solid/paper-clip.svg";
import ItemControls from "../ItemControls/ItemControls.js";
import Columns from "../ui/layout/Columns.js";
import Column from "../ui/layout/Column.js";
import Stack from "../ui/layout/Stack.js";
import Text from "../ui/Text.js";
import resolveTimestamp from "../../util/resolveTimestamp.js";
import IconButton from "../ui/IconButton.js";
import ItemCard from "./ItemCard.js";

const NoteItem = ({ darkMode, handleEditItem, item }) => {
  const renderCodeBlock = (props) => {
    return <CodeBlock {...props} darkMode={darkMode} />;
  };

  return (
    <ItemCard>
      <Stack space="small">
        <Columns
          alignItems="flex-start"
          space="small"
          justifyContent="space-between"
        >
          <Column width="content">
            <IconButton handleClick={handleEditItem} variant={item.type}>
              <PaperClipIcon width={20} height={20} />
            </IconButton>
          </Column>
          <Column width="fill">
            <Stack>
              <Text size="large" weight="600">
                {item.title}
              </Text>
              <Text subtitle>{resolveTimestamp(item.timestamp)}</Text>
            </Stack>
          </Column>
          <Column width="content">
            <ItemControls item={item} />
          </Column>
        </Columns>
        <ReactMarkdown
          source={item.body}
          renderers={{ code: renderCodeBlock }}
        />
      </Stack>
    </ItemCard>
  );
};

export default NoteItem;
