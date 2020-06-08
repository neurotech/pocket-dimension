import React from "react";
import Columns from "../ui/layout/Columns.js";
import Column from "../ui/layout/Column.js";
import itemTypes from "../../util/itemTypes.js";
import IconButton from "../ui/IconButton.js";
import ArrowIndicator from "./ArrowIndicator.js";
import HomeIcon from "heroicons/solid/home.svg";
import LinkIcon from "heroicons/solid/link.svg";
import PaperClipIcon from "heroicons/solid/paper-clip.svg";
import BookIcon from "heroicons/solid/book-open.svg";

const TypeSwitcher = ({ handleTypeFilter, filterType }) => {
  return (
    <Columns space="small">
      <Column>
        <IconButton
          handleClick={() => handleTypeFilter(itemTypes.all)}
          variant={itemTypes.all}
        >
          <HomeIcon width={20} height={20} />
          {filterType === itemTypes.all && <ArrowIndicator />}
        </IconButton>
      </Column>
      <Column>
        <IconButton
          handleClick={() => handleTypeFilter(itemTypes.link)}
          variant={itemTypes.link}
        >
          <LinkIcon width={20} height={20} />
          {filterType === itemTypes.link && <ArrowIndicator />}
        </IconButton>
      </Column>
      <Column>
        <IconButton
          handleClick={() => handleTypeFilter(itemTypes.note)}
          variant={itemTypes.note}
        >
          <PaperClipIcon width={20} height={20} />
          {filterType === itemTypes.note && <ArrowIndicator />}
        </IconButton>
      </Column>
      <Column>
        <IconButton
          handleClick={() => handleTypeFilter(itemTypes.diary)}
          variant={itemTypes.diary}
        >
          <BookIcon width={20} height={20} />
          {filterType === itemTypes.diary && <ArrowIndicator />}
        </IconButton>
      </Column>
    </Columns>
  );
};

export default TypeSwitcher;
