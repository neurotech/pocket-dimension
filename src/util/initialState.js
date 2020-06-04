import itemTypes from "../util/itemTypes.js";

const initialState = {
  archiveMode: false,
  darkMode: false,
  dialogOpen: false,
  error: null,
  filterText: "",
  filterType: itemTypes.all,
  filteredItems: [],
  isLoading: false,
  item: null,
  items: [],
  pasted: false,
  token: null,
  type: "all",
};

export default initialState;
