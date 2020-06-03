import React from "react";

const EditItem = ({ item, handleEditItem }) => {
  return <button onClick={() => handleEditItem(item)}>Edit Item</button>;
};

export default EditItem;
