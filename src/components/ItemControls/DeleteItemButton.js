import React from "react";

const DeleteItem = ({ handleDeleteItem }) => {
  return <button onClick={handleDeleteItem}>Delete Item</button>;
};

export default DeleteItem;
