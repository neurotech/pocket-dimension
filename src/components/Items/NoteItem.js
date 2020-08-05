import React, { useState } from "react";
import Markdown from "./Markdown.js";
import CodeBlock from "../CodeBlock/CodeBlock.js";
import ItemControls from "../ItemControls/ItemControls.js";
import Columns from "../ui/layout/Columns.js";
import Column from "../ui/layout/Column.js";
import Stack from "../ui/layout/Stack.js";
import Text from "../ui/Text.js";
import resolveTimestamp from "../../util/resolveTimestamp.js";
import ItemCard from "./ItemCard.js";
import Divider from "../ui/Divider.js";
import ExpandNoteItemButton from "../ui/IconButtons/ExpandNoteItemButton.js";
import { useStore } from "../../util/Store.js";
import { COLLAPSE_ITEM, EXPAND_ITEM } from "../../util/actionTypes.js";

const NoteItem = ({ item, isStale }) => {
  const { state, dispatch } = useStore();

  const isExpanded = () => {
    return state.expandedItems.indexOf(item.id) !== -1;
  };

  const toggleExpanded = () => {
    if (isExpanded()) {
      dispatch({ type: COLLAPSE_ITEM, payload: item.id });
    } else {
      dispatch({ type: EXPAND_ITEM, payload: item.id });
    }
  };

  const renderCodeBlock = (props) => {
    return <CodeBlock {...props} darkMode={state.darkMode} />;
  };

  const renderLink = (props) => {
    return <a target={"blank"} {...props} />;
  };

  return (
    <ItemCard
      isStale={isStale}
      title={resolveTimestamp(item.timestamp)}
      itemType={item.type}
    >
      <Stack space="small">
        <Columns
          collapseMobile
          alignItems="center"
          flow="wrap"
          justifyContent="space-between"
          space="small"
        >
          <Column>
            <Columns alignItems="center" space="small">
              <Column width="content">
                <ExpandNoteItemButton
                  expanded={isExpanded()}
                  toggleExpanded={toggleExpanded}
                />
              </Column>
              <Column width="fill">
                <Stack space="xxsmall" padLastChild={false}>
                  <Text
                    cursor="auto"
                    size="large"
                    variant={"heading"}
                    weight="600"
                  >
                    {item.title}
                  </Text>
                </Stack>
              </Column>
            </Columns>
          </Column>
          <Column width="content">
            {!isStale && <ItemControls item={item} />}
          </Column>
        </Columns>
        {isExpanded() && (
          <>
            <Divider />
            <Markdown
              source={item.body}
              renderers={{ code: renderCodeBlock, link: renderLink }}
            />
          </>
        )}
      </Stack>
    </ItemCard>
  );
};

export default React.memo(NoteItem);
