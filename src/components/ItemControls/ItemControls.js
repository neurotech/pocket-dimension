import React from "react";
import EditItemButton from "./EditItemButton.js";
import FocusItemButton from "./FocusItemButton.js";
import ArchiveItemButton from "./ArchiveItemButton.js";
import DeleteItemButton from "./DeleteItemButton.js";

const ItemControls = ({
  item,
  handleEditItem,
  handleFocusItem,
  handleArchiveItem,
  handleDeleteItem,
}) => {
  return (
    <>
      <EditItemButton item={item} handleEditItem={handleEditItem} />
      <FocusItemButton
        title={item.title}
        handleFocusItem={handleFocusItem}
      ></FocusItemButton>
      <ArchiveItemButton item={item} handleArchiveItem={handleArchiveItem} />
      <DeleteItemButton item={item} handleDeleteItem={handleDeleteItem} />
    </>
  );
};

export default ItemControls;
