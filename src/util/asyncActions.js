import url from "./url.js";

const getAuthorizationHeader = (token) => ({
  Authorization: `Bearer ${token}`,
});

const fetchArchivedItems = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const urlToFetch = url.archivedItems;
    const options = {
      method: "GET",
      headers: getAuthorizationHeader(token),
    };
    let response = await fetch(urlToFetch, options);
    return response.json();
  } catch (error) {
    return error;
  }
};

const fetchActiveItems = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const urlToFetch = url.allItems;
    const options = {
      method: "GET",
      headers: getAuthorizationHeader(token),
    };
    let response = await fetch(urlToFetch, options);
    return response.json();
  } catch (error) {
    return error;
  }
};

const fetchItems = async (archiveMode) => {
  let items = [];

  if (archiveMode) {
    items = await fetchArchivedItems();
  } else {
    items = await fetchActiveItems();
  }

  return items;
};

const login = async (username, password) => {
  try {
    const options = {
      method: "POST",
      body: JSON.stringify({ username, password }),
    };
    let response = await fetch(url.login, options);
    return response.json();
  } catch (error) {
    return error;
  }
};

const deleteItem = async (id, timestamp) => {
  try {
    const token = sessionStorage.getItem("token");
    const options = {
      method: "DELETE",
      headers: getAuthorizationHeader(token),
    };
    let response = await fetch(url.deleteItem(id, timestamp), options);
    return response.json();
  } catch (error) {
    return error;
  }
};

const createItem = async (item) => {
  try {
    const token = sessionStorage.getItem("token");
    const options = {
      method: "POST",
      headers: getAuthorizationHeader(token),
      body: JSON.stringify(item),
    };
    let response = await fetch(url.createItem, options);
    return response.json();
  } catch (error) {
    return error;
  }
};

const updateItem = async (item) => {
  try {
    const token = sessionStorage.getItem("token");
    const options = {
      method: "PUT",
      headers: getAuthorizationHeader(token),
      body: JSON.stringify(item),
    };
    let response = await fetch(
      url.updateItem(item.id, item.timestamp),
      options
    );
    return response.json();
  } catch (error) {
    return error;
  }
};

export {
  createItem,
  fetchActiveItems,
  fetchArchivedItems,
  fetchItems,
  login,
  deleteItem,
  updateItem,
};
