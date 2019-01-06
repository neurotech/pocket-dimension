const cpjax = require("cpjax");

module.exports = {
  get: {
    all: function getAllItems(callback) {
      cpjax("/api/items/all", function(error, data) {
        if (error) callback(error);
        let items = JSON.parse(data).data;
        callback(null, items);
      });
    }
  },
  post: function postItem(item, callback) {
    cpjax(
      { url: "/api/items/create", method: "POST", data: JSON.stringify(item) },
      function(error, data) {
        if (error) callback(error);
        let items = JSON.parse(data).data;
        callback(null, items);
      }
    );
  }
};
