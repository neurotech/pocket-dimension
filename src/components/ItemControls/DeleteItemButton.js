import React from "react";
import IconButton from "../ui/IconButton";
import CrossIcon from "heroicons/solid/x.svg";

const DeleteItemButton = ({ handleDeleteItem }) => {
  return (
    <IconButton handleClick={handleDeleteItem} variant={"delete"}>
      <CrossIcon width={20} height={20} />
    </IconButton>
  );
};

export default DeleteItemButton;
