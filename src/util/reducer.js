import initialState from "./initialState.js";
import {
  FETCH_ITEMS_COMPLETE,
  FILTER_TEXT_CHANGED,
  FILTER_TYPE_CHANGED,
  LOGIN,
  LOGOUT,
  PASTE_EVENT,
  SET_DARK_MODE,
  SET_IS_LOADING_OFF,
  SET_IS_LOADING_ON,
  SET_ITEM_DIALOG_CLOSED,
  SET_ITEM_DIALOG_OPEN,
  TOGGLE_ARCHIVE_MODE,
} from "./actionTypes.js";

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_ITEMS_COMPLETE:
      return { ...state, items: action.payload };

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

    default:
      throw new Error();
  }
};

export default reducer;
