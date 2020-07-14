const base = "https://api.pocket-dimension.space/";

const url = {
  allItems: `${base}items/all`,
  archivedItems: `${base}items/archived`,
  createItem: `${base}item/create`,
  login: `${base}login`,
  updateItem: (id, timestamp) =>
    `${base}item/update?id=${id}&timestamp=${timestamp}`,
  deleteItem: (id, timestamp) =>
    `${base}item/delete?id=${id}&timestamp=${timestamp}`,
  pageInfo: `${base}get-page-info`,
};

export default url;
