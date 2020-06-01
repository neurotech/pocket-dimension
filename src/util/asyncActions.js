import url from "./url.js";

const getAuthorizationHeader = (token) => ({
  Authorization: `Bearer ${token}`,
});

const fetchItems = (state, token, archived) => {
  state.setState({
    isLoading: false,
  });

  const urlToFetch = archived ? url.archivedItems : url.allItems;

  const options = {
    headers: getAuthorizationHeader(token),
  };

  fetch(urlToFetch, options)
    .then((res) => res.json())
    .then(
      (result) => {
        state.setState({
          isLoading: true,
          items: result,
        });
      },
      (error) => {
        state.setState({
          isLoading: true,
          error,
        });
      }
    );
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

export { fetchItems, login, deleteItem };
