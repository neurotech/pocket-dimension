import React from "react";
import Columns from "../ui/layout/Columns";
import Column from "../ui/layout/Column";
import TextButton from "../ui/TextButton";

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
        <input type="checkbox" checked={darkMode} onChange={handleDarkMode} />
        <label>{darkMode ? "🌛" : "🌞"}</label>
      </Column>
      <Column>
        <input
          type="checkbox"
          checked={archiveMode}
          onChange={handleArchiveMode}
        />
        <label>⌚</label>
      </Column>
      <Column>
        <TextButton
          handleClick={handleCreateItem}
          label={"Create"}
        ></TextButton>
      </Column>
      <Column>
        <TextButton handleClick={handleLogout} label={"Logout"}></TextButton>
      </Column>
    </Columns>
  );
};

export default Controls;
