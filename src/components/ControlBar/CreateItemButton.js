import React from "react";
import TextButton from "../ui/TextButton";

const CreateItemButton = ({ handleCreateItem }) => {
  return (
    <TextButton
      handleClick={handleCreateItem}
      label={"Create"}
      variant="create"
    ></TextButton>
  );
};

export default CreateItemButton;
