import React from "react";
import ItemControls from "../ItemControls/ItemControls.js";
import Columns from "../ui/layout/Columns.js";
import Column from "../ui/layout/Column.js";
import Stack from "../ui/layout/Stack.js";
import Text from "../ui/Text.js";
import resolveTimestamp from "../../util/resolveTimestamp.js";
import ItemCard from "./ItemCard.js";
import EditLinkIconButton from "../ui/IconButtons/EditLinkIconButton.js";
import styled from "styled-components";

const StyledLink = styled.a``;

const LinkItem = ({ item, isStale }) => {
  const trimTitle = (title) => {
    if (title.length > 135) {
      return title.substr(0, 132) + "...";
    }

    return title;
  };
  return (
    <ItemCard isStale={isStale}>
      <Columns
        collapseMobile
        alignItems="flex-start"
        flow="wrap"
        space="small"
        justifyContent="space-between"
      >
        <Column>
          <Columns alignItems="start" space="small">
            <Column width="content">
              <EditLinkIconButton item={item} isStale={isStale} />
            </Column>
            <Column width="fill">
              <Stack space="xxsmall">
                <Text size="large" variant={"heading"} weight="600">
                  {isStale ? item.title : <a href={item.body}>{item.title}</a>}
                </Text>
                <Text variant={"subtitle"}>
                  {resolveTimestamp(item.timestamp)}
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
