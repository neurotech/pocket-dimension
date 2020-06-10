import React from "react";
import LinkIcon from "heroicons/solid/link.svg";
import ItemControls from "../ItemControls/ItemControls.js";
import Columns from "../ui/layout/Columns.js";
import Column from "../ui/layout/Column.js";
import Stack from "../ui/layout/Stack.js";
import Text from "../ui/Text.js";
import resolveTimestamp from "../../util/resolveTimestamp.js";
import ItemCard from "./ItemCard.js";
import LinkIconButton from "../ui/IconButtons/LinkIconButton.js";

const LinkItem = ({ handleEditItem, item }) => {
  return (
    <ItemCard>
      <Columns
        alignItems="flex-start"
        space="small"
        justifyContent="space-between"
      >
        <Column width="content">
          <LinkIconButton onClick={handleEditItem} />
        </Column>
        <Column width="fill">
          <Stack space="xxsmall">
            <Text size="large" weight="600">
              <a href={item.body}>{item.title}</a>
            </Text>
            <Text subtitle>{resolveTimestamp(item.timestamp)}</Text>
          </Stack>
        </Column>
        <Column width="content">
          <ItemControls item={item} />
        </Column>
      </Columns>
    </ItemCard>
  );
};

export default LinkItem;
