import React from "react";
import Columns from "../ui/layout/Columns";
import Column from "../ui/layout/Column";
import ToggleButton from "../ui/ToggleButton";
import CreateIconButton from "../ui/IconButtons/CreateIconButton.js";
import LogoutIconButton from "../ui/IconButtons/LogoutIconButton.js";

const Controls = ({
  archiveMode,
  darkMode,
  handleDarkMode,
  handleArchiveMode,
  handleCreateItem,
  handleLogout,
}) => {
  return (
    <Columns space="small">
      <Column>
        <ToggleButton
          toggled={darkMode}
          onClick={handleDarkMode}
          variant={"darkMode"}
        />
      </Column>
      <Column>
        <ToggleButton
          toggled={archiveMode}
          onClick={handleArchiveMode}
          variant={"archive"}
        />
      </Column>
      <Column>
        <CreateIconButton onClick={handleCreateItem} />
      </Column>
      <Column>
        <LogoutIconButton onClick={handleLogout} />
      </Column>
    </Columns>
  );
};

export default Controls;
