import { fetchItems, createItem, fetchActiveItems } from "./asyncActions.js";
import {
  FETCH_ACTIVE_ITEMS_COMPLETE,
  SET_IS_LOADING_ON,
  SET_ERROR,
} from "./actionTypes.js";
import itemTypes from "../util/itemTypes.js";

const handleLinkPaste = async (event, dialogOpen, dispatch) => {
  const clipboard = event.clipboardData || window.clipboardData;
  const clipboardContents = clipboard.getData("text");

  if (
    !dialogOpen &&
    typeof clipboardContents === "string" &&
    clipboardContents.length > 0
  ) {
    try {
      let url = new URL(clipboardContents);
      let item = {
        type: itemTypes.link,
        body: url.href,
        generateTitle: true,
        isArchived: false,
      };
      dispatch({ type: SET_IS_LOADING_ON });
      await createItem(item);

      let items = await fetchActiveItems();
      dispatch({ type: FETCH_ACTIVE_ITEMS_COMPLETE, payload: items });
    } catch (ex) {
      dispatch({
        type: SET_ERROR,
        payload:
          "Could not automatically create a link post. An invalid URL was pasted.",
      });
    }
  }
};

export default handleLinkPaste;
