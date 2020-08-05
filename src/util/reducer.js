import initialState from "./initialState.js";
import {
  COLLAPSE_ITEM,
  EXPAND_ITEM,
  FETCH_ACTIVE_ITEMS_COMPLETE,
  FETCH_ARCHIVED_ITEMS_COMPLETE,
  FILTER_TEXT_CHANGED,
  FILTER_TYPE_CHANGED,
  LOGIN,
  LOGOUT,
  PASTE_EVENT,
  SET_CURRENT_ITEMS,
  SET_DARK_MODE,
  SET_ERROR,
  SET_IS_LOADING_OFF,
  SET_IS_LOADING_ON,
  SET_ITEM_DIALOG_CLOSED,
  SET_ITEM_DIALOG_OPEN,
  SET_SCROLL_TO_BOTTOM,
  SET_STALE_ITEM,
  SET_THEME,
  TOGGLE_ARCHIVE_MODE,
} from "./actionTypes.js";

const getRandomString = () => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const upsert = (item, collection) => {
  if (collection.indexOf(item) === -1) {
    return collection.concat([item]);
  }
  return collection;
};

const Reducer = (state, action) => {
  switch (action.type) {
    case COLLAPSE_ITEM:
      let updated = state.expandedItems;
      let itemLocation = state.expandedItems.indexOf(action.payload);
      updated.splice(itemLocation, 1);
      return { ...state, updated };

    case EXPAND_ITEM:
      return {
        ...state,
        expandedItems: [...state.expandedItems, action.payload],
      };

    case FETCH_ACTIVE_ITEMS_COMPLETE:
      return {
        ...state,
        isLoading: false,
        staleItems: [],
        items: action.payload,
      };

    case FETCH_ARCHIVED_ITEMS_COMPLETE:
      return {
        ...state,
        isLoading: false,
        staleItems: [],
        archivedItems: action.payload,
      };

    case FILTER_TEXT_CHANGED:
      return { ...state, filterText: action.payload };

    case FILTER_TYPE_CHANGED:
      return { ...state, filterType: action.payload };

    case LOGIN:
      return { ...state, token: action.payload };

    case LOGOUT:
      sessionStorage.removeItem("token");
      return {
        ...state,
        archivedItems: initialState.archivedItems,
        currentItems: initialState.currentItems,
        items: initialState.items,
        token: initialState.token,
      };

    case PASTE_EVENT:
      return { ...state, pasted: action.payload };

    case SET_CURRENT_ITEMS:
      return { ...state, currentItems: action.payload };

    case SET_DARK_MODE:
      localStorage.setItem("pocket-dimension:dark-mode", action.payload);
      return { ...state, darkMode: action.payload };

    case SET_ERROR:
      console.error(action.payload);
      return {
        ...state,
        dialogOpen: false,
        error: action.payload,
        isloading: false,
      };

    case SET_IS_LOADING_OFF:
      return { ...state, isLoading: false };

    case SET_IS_LOADING_ON:
      return { ...state, isLoading: true };

    case TOGGLE_ARCHIVE_MODE:
      return { ...state, archiveMode: !state.archiveMode };

    case SET_ITEM_DIALOG_CLOSED:
      return { ...state, dialogOpen: false, item: null };

    case SET_ITEM_DIALOG_OPEN:
      return { ...state, dialogOpen: true, item: action.payload };

    case SET_STALE_ITEM:
      return {
        ...state,
        staleItems: upsert(action.payload, state.staleItems),
      };

    case SET_SCROLL_TO_BOTTOM:
      return { ...state, scrollToBottom: getRandomString() };

    case SET_THEME:
      return { ...state, theme: action.payload };

    default:
      throw new Error();
  }
};

export default Reducer;
