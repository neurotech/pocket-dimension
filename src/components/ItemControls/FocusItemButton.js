import React from "react";

const FocusItem = ({ title, handleFocusItem }) => {
  return <button onClick={() => handleFocusItem(title)}>Focus Item</button>;
};

export default FocusItem;
