import initialState from "./initialState.js";
import {
  FETCH_ACTIVE_ITEMS_COMPLETE,
  FETCH_ARCHIVED_ITEMS_COMPLETE,
  FILTER_TEXT_CHANGED,
  FILTER_TYPE_CHANGED,
  LOGIN,
  LOGOUT,
  PASTE_EVENT,
  SET_DARK_MODE,
  SET_ERROR,
  SET_IS_LOADING_OFF,
  SET_IS_LOADING_ON,
  SET_ITEM_DIALOG_CLOSED,
  SET_ITEM_DIALOG_OPEN,
  TOGGLE_ARCHIVE_MODE,
  SET_THEME,
} from "./actionTypes.js";

const Reducer = (state, action) => {
  switch (action.type) {
    case FETCH_ACTIVE_ITEMS_COMPLETE:
      return { ...state, isLoading: false, items: action.payload };

    case FETCH_ARCHIVED_ITEMS_COMPLETE:
      return { ...state, isLoading: false, archivedItems: action.payload };

    case FILTER_TEXT_CHANGED:
      return { ...state, filterText: action.payload };

    case FILTER_TYPE_CHANGED:
      return { ...state, filterType: action.payload };

    case LOGIN:
      return { ...state, token: action.payload };

    case LOGOUT:
      sessionStorage.removeItem("token");
      return { ...state, items: initialState.items, token: initialState.token };

    case PASTE_EVENT:
      return { ...state, pasted: action.payload };

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

    case SET_THEME:
      return { ...state, theme: action.payload };

    default:
      throw new Error();
  }
};

export default Reducer;
