import React from "react";

const LinkItem = ({ item }) => {
  return (
    <div>
      <a href={item.body}>{item.title}</a>
    </div>
  );
};

export default LinkItem;
