import React from "react";
import TextButton from "../ui/TextButton";

const RefreshItems = ({ handleFetchItems, label }) => {
  return <TextButton handleClick={handleFetchItems} label={label} />;
};

export default RefreshItems;
