import React from "react";
import IconButton from "../ui/IconButton.js";
import RefreshIcon from "heroicons/solid/refresh.svg";

const RefreshItems = ({ handleFetchItems, isLoading }) => {
  return (
    <IconButton
      handleClick={handleFetchItems}
      variant="refresh"
      isLoading={isLoading}
    >
      <RefreshIcon width={20} height={20} />
    </IconButton>
  );
};

export default RefreshItems;
