import React from "react";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../CodeBlock";
import BookIcon from "heroicons/solid/book-open.svg";
import ItemControls from "../ItemControls/ItemControls.js";
import Columns from "../ui/layout/Columns.js";
import Column from "../ui/layout/Column.js";
import Stack from "../ui/layout/Stack.js";
import Text from "../ui/Text";
import IconButton from "../ui/IconButton";
import resolveTimestamp from "../../util/resolveTimestamp";
import ItemCard from "./ItemCard";

const DiaryItem = ({ darkMode, handleEditItem, item }) => {
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
              <BookIcon width={20} height={20} />
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

export default DiaryItem;
