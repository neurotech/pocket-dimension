import React from "react";
import TextButton from "../ui/TextButton";

const LogoutButton = ({ handleLogout }) => {
  return (
    <TextButton
      handleClick={handleLogout}
      label={"Logout"}
      variant="logout"
    ></TextButton>
  );
};

export default LogoutButton;
