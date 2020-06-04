import { createItem } from "./asyncActions.js";
import { SET_IS_LOADING_OFF, SET_IS_LOADING_ON } from "./actionTypes.js";
import itemTypes from "../util/itemTypes.js";

const handleLinkPaste = async (
  event,
  handleFetchItems,
  archiveMode,
  dispatch
) => {
  const clipboard = event.clipboardData || window.clipboardData;
  const clipboardContents = clipboard.getData("text");

  if (typeof clipboardContents === "string" && clipboardContents.length > 0) {
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
      dispatch({ type: SET_IS_LOADING_OFF });

      await handleFetchItems(archiveMode);
    } catch (ex) {
      console.error(
        "Could not automatically create a link post. An invalid URL was pasted."
      );
    }
    dispatch({ type: SET_IS_LOADING_OFF });
  }
};

export default handleLinkPaste;
