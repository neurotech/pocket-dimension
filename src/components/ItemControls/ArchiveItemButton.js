import React from "react";

const ArchiveItem = ({ item, handleArchiveItem }) => {
  return <button onClick={() => handleArchiveItem(item)}>Archive Item</button>;
};

export default ArchiveItem;
