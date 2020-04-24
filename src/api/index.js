const cpjax = require("cpjax");

module.exports = {
  get: {
    all: function getAllItems(token, callback) {
      cpjax(
        { url: "https://api.pocket-dimension.space/items/all", auth: `Bearer ${token}` },
        function (error, data) {
          if (error) {
            return callback(error);
          }
          let items = JSON.parse(data);
          callback(null, items);
        }
      );
    },
    archived: function getAllArchivedItems(token, callback) {
      cpjax(
        { url: "https://api.pocket-dimension.space/items/archived", auth: `Bearer ${token}` },
        function (error, data) {
          if (error) {
            return callback(error);
          }
          let items = JSON.parse(data);
          callback(null, items);
        }
      );
    },
  },
  update: function updateItem(token, item, callback) {
    cpjax(
      {
        url: `https://api.pocket-dimension.space/item/update?id=${item.id}&timestamp=${item.timestamp}`,
        method: "PUT",
        json: true,
        auth: `Bearer ${token}`,
        data: JSON.stringify(item),
      },
      function (error, data) {
        if (error) {
          return callback(error);
        }
        let status = JSON.parse(data).status;
        callback(null, status);
      }
    );
  },
  create: function postItem(token, item, callback) {
    cpjax(
      {
        url: "https://api.pocket-dimension.space/item/create",
        method: "POST",
        auth: `Bearer ${token}`,
        json: true,
        data: JSON.stringify(item),
      },
      function (error, data) {
        if (error) {
          return callback(error);
        }
        let items = JSON.parse(data);
        callback(null, items);
      }
    );
  },
  delete: {
    item: function deleteItem(token, id, timestamp, callback) {
      cpjax(
        {
          url: `https://api.pocket-dimension.space/item/delete?id=${id}&timestamp=${timestamp}`,
          method: "DELETE",
          auth: `Bearer ${token}`,
          json: true,
        },
        function (error, data) {
          if (error) {
            return callback(error);
          }
          let status = JSON.parse(data).status;
          callback(null, status);
        }
      );
    },
  },
  pageInfo: function getPageInfo(token, url, callback) {
    cpjax(
      {
        url: `https://api.pocket-dimension.space/get-page-info`,
        method: "POST",
        auth: `Bearer ${token}`,
        json: true,
        data: JSON.stringify(url),
      },
      function (error, data) {
        if (error) {
          return callback(error);
        }
        let info = JSON.parse(data).title;
        callback(null, info);
      }
    );
  },
  login: function postLogin(login, callback) {
    var credentials = { username: login.username, password: login.password };
    cpjax(
      {
        url: "https://api.pocket-dimension.space/login",
        method: "POST",
        json: true,
        data: JSON.stringify(credentials),
      },
      function (error, data) {
        if (error) {
          return callback(error);
        }
        let token = JSON.parse(data).token;
        callback(null, token);
      }
    );
  },
};
