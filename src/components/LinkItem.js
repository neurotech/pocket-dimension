import React from "react";
import LinkIcon from "heroicons/solid/link.svg";
import ItemControls from "./ItemControls/ItemControls.js";

const LinkItem = ({ item }) => {
  return (
    <div>
      <LinkIcon width={20} height={20} />
      <a href={item.body}>{item.title}</a>
      <ItemControls item={item} />
    </div>
  );
};

export default LinkItem;
