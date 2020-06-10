import React from "react";

const EventHandler = ({ children, onKeyDown, onPaste }) => {
  return (
    <div onKeyDown={onKeyDown} onPaste={onPaste}>
      {children}
    </div>
  );
};

export default EventHandler;
