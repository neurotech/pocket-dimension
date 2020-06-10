import React from "react";
import Columns from "../ui/layout/Columns.js";
import Column from "../ui/layout/Column.js";
import itemTypes from "../../util/itemTypes.js";
import ArrowIndicator from "./ArrowIndicator.js";
import AllIconButton from "../ui/IconButtons/AllIconButton.js";
import LinkIconButton from "../ui/IconButtons/LinkIconButton.js";
import NoteIconButton from "../ui/IconButtons/NoteIconButton.js";
import DiaryIconButton from "../ui/IconButtons/DiaryIconButton.js";

const TypeSwitcher = ({ handleTypeFilter, filterType }) => {
  return (
    <Columns space="small">
      <Column>
        <AllIconButton onClick={() => handleTypeFilter(itemTypes.all)}>
          {filterType === itemTypes.all && <ArrowIndicator />}
        </AllIconButton>
      </Column>
      <Column>
        <LinkIconButton onClick={() => handleTypeFilter(itemTypes.link)}>
          {filterType === itemTypes.link && <ArrowIndicator />}
        </LinkIconButton>
      </Column>
      <Column>
        <NoteIconButton onClick={() => handleTypeFilter(itemTypes.note)}>
          {filterType === itemTypes.note && <ArrowIndicator />}
        </NoteIconButton>
      </Column>
      <Column>
        <DiaryIconButton onClick={() => handleTypeFilter(itemTypes.diary)}>
          {filterType === itemTypes.diary && <ArrowIndicator />}
        </DiaryIconButton>
      </Column>
    </Columns>
  );
};

export default TypeSwitcher;
