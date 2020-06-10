import React from "react";
import Columns from "../ui/layout/Columns.js";
import Column from "../ui/layout/Column.js";
import itemTypes from "../../util/itemTypes.js";
import ArrowIndicator from "./ArrowIndicator.js";
import AllIconButton from "../ui/IconButtons/AllIconButton.js";
import LinkIconButton from "../ui/IconButtons/LinkIconButton.js";
import NoteIconButton from "../ui/IconButtons/NoteIconButton.js";
import DiaryIconButton from "../ui/IconButtons/DiaryIconButton.js";
import { useStore } from "../../util/Store.js";

const TypeSwitcher = () => {
  const { state } = useStore();

  return (
    <Columns space="small">
      <Column>
        <AllIconButton>
          {state.filterType === itemTypes.all && <ArrowIndicator />}
        </AllIconButton>
      </Column>
      <Column>
        <LinkIconButton>
          {state.filterType === itemTypes.link && <ArrowIndicator />}
        </LinkIconButton>
      </Column>
      <Column>
        <NoteIconButton>
          {state.filterType === itemTypes.note && <ArrowIndicator />}
        </NoteIconButton>
      </Column>
      <Column>
        <DiaryIconButton>
          {state.filterType === itemTypes.diary && <ArrowIndicator />}
        </DiaryIconButton>
      </Column>
    </Columns>
  );
};

export default TypeSwitcher;
