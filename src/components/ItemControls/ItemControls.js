import React from "react";
import FocusItemButton from "../ui/TextButtons/FocusItemButton.js";
import ArchiveItemButton from "../ui/TextButtons/ArchiveItemButton.js";
import DeleteItemButton from "../ui/TextButtons/DeleteItemButton.js";
import Columns from "../ui/layout/Columns.js";
import Column from "../ui/layout/Column.js";

const ItemControls = ({ item }) => {
  return (
    <Columns
      alignItems="space-between"
      space="xsmall"
      justifyContent="flex-start"
    >
      <Column>
        <FocusItemButton title={item.title} />
      </Column>
      <Column>
        <ArchiveItemButton item={item} />
      </Column>
      <Column>
        <DeleteItemButton item={item} />
      </Column>
    </Columns>
  );
};

export default ItemControls;
