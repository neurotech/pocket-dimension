import React from "react";
import Columns from "../ui/layout/Columns";
import Column from "../ui/layout/Column";
import ToggleButton from "../ui/ToggleButton";
import AddIcon from "heroicons/solid/document-add.svg";
import LogoutIcon from "heroicons/solid/logout.svg";
import IconButton from "../ui/IconButton";

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
        <IconButton handleClick={handleCreateItem} variant={"create"}>
          <AddIcon width={20} height={20} />
        </IconButton>
      </Column>
      <Column>
        <IconButton handleClick={handleLogout} variant={"logout"}>
          <LogoutIcon width={20} height={20} />
        </IconButton>
      </Column>
    </Columns>
  );
};

export default Controls;
