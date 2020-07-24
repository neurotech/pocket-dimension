import React from "react";
import ItemControls from "../ItemControls/ItemControls.js";
import Columns from "../ui/layout/Columns.js";
import Column from "../ui/layout/Column.js";
import Stack from "../ui/layout/Stack.js";
import Text from "../ui/Text.js";
import resolveTimestamp from "../../util/resolveTimestamp.js";
import ItemCard from "./ItemCard.js";
import ExpandLinkItemButton from "../ui/IconButtons/ExpandLinkItemButton.js";

const LinkItem = ({ item, isStale }) => {
  return (
    <ItemCard
      isStale={isStale}
      title={resolveTimestamp(item.timestamp)}
      itemType={item.type}
    >
      <Columns
        collapseMobile
        alignItems="center"
        flow="wrap"
        space="small"
        justifyContent="space-between"
      >
        <Column>
          <Columns alignItems="center" space="small">
            <Column width="content">
              <ExpandLinkItemButton />
            </Column>
            <Column width="fill">
              <Stack space="xxsmall">
                <Text size="large" variant={"heading"} weight="600">
                  {isStale ? (
                    item.title
                  ) : (
                    <a href={item.body} target={"blank"}>
                      {item.title}
                    </a>
                  )}
                </Text>
              </Stack>
            </Column>
          </Columns>
        </Column>
        <Column width="content">
          {!isStale && <ItemControls item={item} />}
        </Column>
      </Columns>
    </ItemCard>
  );
};

export default LinkItem;
