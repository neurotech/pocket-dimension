import React from "react";
import FocusIconButton from "../ui/IconButtons/FocusIconButton.js";
import ArchiveIconButton from "../ui/IconButtons/ArchiveIconButton.js";
import DeleteIconButton from "../ui/IconButtons/DeleteIconButton.js";
import Columns from "../ui/layout/Columns.js";
import Column from "../ui/layout/Column.js";

const ItemControls = ({ item }) => {
  return (
    <Columns space="xsmall">
      <Column>
        <FocusIconButton title={item.title} />
      </Column>
      <Column>
        <ArchiveIconButton item={item} />
      </Column>
      <Column>
        <DeleteIconButton item={item} />
      </Column>
    </Columns>
  );
};

export default ItemControls;
