import { SET_ITEM_DIALOG_CLOSED } from "./actionTypes";

const handleKeydown = async (event, dialogOpen, dispatch) => {
  if (dialogOpen) {
    if (event.key === "Escape" || event.key === "Esc") {
      event.preventDefault();
      dispatch({ type: SET_ITEM_DIALOG_CLOSED });
    }
  }
};

export default handleKeydown;
