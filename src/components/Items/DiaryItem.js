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
import EditDiaryIconButton from "../ui/IconButtons/EditDiaryIconButton.js";
import { useStore } from "../../util/Store.js";

const DiaryItem = ({ item, isStale }) => {
  const { state } = useStore();

  const renderCodeBlock = (props) => {
    return <CodeBlock {...props} darkMode={state.darkMode} />;
  };

  return (
    <ItemCard isStale={isStale}>
      <Stack space="small">
        <Columns
          alignItems="flex-start"
          space="small"
          justifyContent="space-between"
        >
          <Column width="content">
            <EditDiaryIconButton item={item} isStale={isStale} />
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
            {!isStale && <ItemControls item={item} />}
          </Column>
        </Columns>
        <Divider />
        {!isStale ? (
          <Markdown source={item.body} renderers={{ code: renderCodeBlock }} />
        ) : item.body.length > 100 ? (
          item.body.substring(0, 100) + "..."
        ) : (
          item.body
        )}
      </Stack>
    </ItemCard>
  );
};

export default React.memo(DiaryItem);
