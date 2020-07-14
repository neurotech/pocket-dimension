import { createItem, fetchActiveItems } from "./asyncActions.js";
import {
  FETCH_ACTIVE_ITEMS_COMPLETE,
  SET_IS_LOADING_ON,
  SET_ERROR,
  SET_CURRENT_ITEMS,
} from "./actionTypes.js";
import itemTypes from "../util/itemTypes.js";

const handleLinkPaste = async (event, dialogOpen, pageSize, dispatch) => {
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

      let fetchedItems = await fetchActiveItems();
      dispatch({ type: FETCH_ACTIVE_ITEMS_COMPLETE, payload: fetchedItems });

      if (fetchedItems.length > pageSize) {
        dispatch({
          type: SET_CURRENT_ITEMS,
          payload: fetchedItems.slice(0, pageSize),
        });
      } else {
        dispatch({ type: SET_CURRENT_ITEMS, payload: fetchedItems });
      }
    } catch (ex) {
      console.error(ex);
      dispatch({
        type: SET_ERROR,
        payload:
          "Could not automatically create a link post. An invalid URL was pasted.",
      });
    }
  }
};

export default handleLinkPaste;
