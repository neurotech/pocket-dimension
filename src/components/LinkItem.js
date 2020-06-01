import React from "react";
import LinkIcon from "heroicons/solid/link.svg";

const LinkItem = ({ item }) => {
  return (
    <div>
      <LinkIcon width={20} height={20} />
      <a href={item.body}>{item.title}</a>
    </div>
  );
};

export default LinkItem;
