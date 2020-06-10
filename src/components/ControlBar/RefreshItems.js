import React from "react";
import RefreshIconButton from "../ui/IconButtons/RefreshIconButton.js";

const RefreshItems = ({ onClick, isLoading }) => {
  return <RefreshIconButton onClick={onClick} isLoading={isLoading} />;
};

export default RefreshItems;
