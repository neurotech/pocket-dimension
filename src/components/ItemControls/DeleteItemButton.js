import React from "react";

const DeleteItem = ({ item, handleDeleteItem }) => {
  return (
    <button onClick={() => handleDeleteItem(item.id, item.timestamp)}>
      Delete Item
    </button>
  );
};

export default DeleteItem;
