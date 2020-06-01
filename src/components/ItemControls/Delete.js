import React from "react";

const DeleteItem = ({ item, handleDeleteItem }) => {
  return (
    <button onClick={() => handleDeleteItem(item.id, item.timestamp)}>
      DeleteItem
    </button>
  );
};

export default DeleteItem;
