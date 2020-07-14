import React from "react";
import TextButton from "../TextButton.js";

const NewItemButton = ({ onClick }) => {
  return <TextButton label={"New Item"} onClick={onClick} size="large" />;
};

export default NewItemButton;
