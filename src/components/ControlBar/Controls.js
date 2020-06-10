import React from "react";
import Columns from "../ui/layout/Columns";
import Column from "../ui/layout/Column";
import ToggleButton from "../ui/ToggleButton";
import CreateIconButton from "../ui/IconButtons/CreateIconButton.js";
import LogoutIconButton from "../ui/IconButtons/LogoutIconButton.js";
import { useStore } from "../../util/Store.js";
import {
  TOGGLE_ARCHIVE_MODE,
  SET_IS_LOADING_ON,
  FETCH_ACTIVE_ITEMS_COMPLETE,
  SET_ITEM_DIALOG_OPEN,
  LOGOUT,
  SET_DARK_MODE,
  FETCH_ARCHIVED_ITEMS_COMPLETE,
} from "../../util/actionTypes";
import { fetchItems } from "../../util/asyncActions";

const Controls = () => {
  const { state, dispatch } = useStore();

  return (
    <Columns space="small">
      <Column>
        <ToggleButton
          toggled={state.darkMode}
          onClick={() => {
            dispatch({ type: SET_DARK_MODE, payload: !state.darkMode });
          }}
          variant={"darkMode"}
        />
      </Column>
      <Column>
        <ToggleButton
          toggled={state.archiveMode}
          onClick={async () => {
            dispatch({ type: SET_IS_LOADING_ON });
            let items = await fetchItems(!state.archiveMode);
            let complete = !state.archiveMode
              ? FETCH_ARCHIVED_ITEMS_COMPLETE
              : FETCH_ACTIVE_ITEMS_COMPLETE;
            dispatch({ type: complete, payload: items });
            dispatch({ type: TOGGLE_ARCHIVE_MODE });
          }}
          variant={"archive"}
        />
      </Column>
      <Column>
        <CreateIconButton
          onClick={() => {
            dispatch({ type: SET_ITEM_DIALOG_OPEN });
          }}
        />
      </Column>
      <Column>
        <LogoutIconButton
          onClick={() => {
            dispatch({ type: LOGOUT });
          }}
        />
      </Column>
    </Columns>
  );
};

export default Controls;
