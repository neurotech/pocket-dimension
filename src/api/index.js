const cpjax = require("cpjax");

module.exports = {
  get: {
    all: function getAllItems(token, callback) {
      cpjax({ url: "/api/items/all", auth: `Bearer ${token}` }, function(error, data) {
        if (error) {
          return callback(error);
        }
        let items = JSON.parse(data).data;
        callback(null, items);
      });
    }
  },
  update: function updateItem(token, item, callback) {
    cpjax(
      {
        url: `/api/item/update/?id=${item.id}&timestamp=${item.timestamp}`,
        method: "PUT",
        json: true,
        auth: `Bearer ${token}`,
        data: JSON.stringify(item)
      },
      function(error, data) {
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
        url: "/api/items/create",
        method: "POST",
        auth: `Bearer ${token}`,
        json: true,
        data: JSON.stringify(item)
      },
      function(error, data) {
        if (error) {
          return callback(error);
        }
        let items = JSON.parse(data).data;
        callback(null, items);
      }
    );
  },
  delete: {
    item: function deleteItem(token, id, timestamp, callback) {
      cpjax(
        {
          url: `/api/items/delete/?id=${id}&timestamp=${timestamp}`,
          method: "DELETE",
          auth: `Bearer ${token}`,
          json: true
        },
        function(error, data) {
          if (error) {
            return callback(error);
          }
          let status = JSON.parse(data).status;
          callback(null, status);
        }
      );
    }
  },
  pageInfo: function getPageInfo(token, url, callback) {
    cpjax(
      {
        url: `/api/get-page-info`,
        method: "POST",
        auth: `Bearer ${token}`,
        json: true,
        data: JSON.stringify(url)
      },
      function(error, data) {
        if (error) {
          return callback(error);
        }
        let info = JSON.parse(data).data;
        callback(null, info);
      }
    );
  },
  login: function postLogin(login, callback) {
    var credentials = { username: login.username, password: login.password };
    cpjax(
      { url: "/api/login", method: "POST", json: true, data: JSON.stringify(credentials) },
      function(error, data) {
        if (error) {
          return callback(error);
        }
        let token = JSON.parse(data).data;
        callback(null, token);
      }
    );
  }
};
