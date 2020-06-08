import React from "react";
import Columns from "../ui/layout/Columns.js";
import Column from "../ui/layout/Column.js";
import TextButton from "../ui/TextButton.js";
import itemTypes from "../../util/itemTypes.js";

const TypeSwitcher = ({ handleTypeFilter }) => {
  return (
    <Columns space="small">
      <Column>
        <TextButton
          handleClick={() => handleTypeFilter(itemTypes.all)}
          label={"All"}
        />
      </Column>
      <Column>
        <TextButton
          handleClick={() => handleTypeFilter(itemTypes.link)}
          label={"Links"}
        />
      </Column>
      <Column>
        <TextButton
          handleClick={() => handleTypeFilter(itemTypes.note)}
          label={"Notes"}
        />
      </Column>
      <Column>
        <TextButton
          handleClick={() => handleTypeFilter(itemTypes.diary)}
          label={"Diary Entries"}
        />
      </Column>
    </Columns>
  );
};

export default TypeSwitcher;
