import React from "react";
import IconButton from "../ui/IconButton";
import EyeIcon from "heroicons/solid/eye.svg";

const FocusItem = ({ handleFocusItem }) => {
  return (
    <IconButton handleClick={handleFocusItem} variant={"focus"}>
      <EyeIcon width={20} height={20} />
    </IconButton>
  );
};

export default FocusItem;
