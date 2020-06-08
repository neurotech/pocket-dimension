import React from "react";
import IconButton from "../ui/IconButton";
import ArchiveIcon from "heroicons/solid/archive.svg";

const ArchiveItemButton = ({ handleArchiveItem }) => {
  return (
    <IconButton handleClick={handleArchiveItem} variant={"archive"}>
      <ArchiveIcon width={20} height={20} />
    </IconButton>
  );
};

export default ArchiveItemButton;
