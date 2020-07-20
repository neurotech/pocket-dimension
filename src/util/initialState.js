import itemTypes from "../util/itemTypes.js";

const initialState = {
  archivedItems: [],
  archiveMode: false,
  currentItems: [],
  darkMode: false,
  dialogOpen: false,
  error: null,
  filterText: "",
  filterType: itemTypes.all,
  filteredItems: [],
  isLoading: false,
  item: null,
  items: [],
  pageSize: 12,
  pasted: false,
  scrollToBottom: null,
  staleItems: [],
  theme: "light",
  token: null,
  type: "all",
};

export default initialState;
