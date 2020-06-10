import React from "react";
import Markdown from "./Markdown.js";
import CodeBlock from "../CodeBlock";
import ItemControls from "../ItemControls/ItemControls.js";
import Columns from "../ui/layout/Columns.js";
import Column from "../ui/layout/Column.js";
import Stack from "../ui/layout/Stack.js";
import Text from "../ui/Text";
import resolveTimestamp from "../../util/resolveTimestamp";
import ItemCard from "./ItemCard";
import Divider from "../ui/Divider.js";
import DiaryIconButton from "../ui/IconButtons/DiaryIconButton.js";

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
            <DiaryIconButton onClick={handleEditItem} />
          </Column>
          <Column width="fill">
            <Stack space="xxsmall">
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
        <Divider />
        <Markdown source={item.body} renderers={{ code: renderCodeBlock }} />
      </Stack>
    </ItemCard>
  );
};

export default DiaryItem;
