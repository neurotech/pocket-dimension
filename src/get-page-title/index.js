const cpjax = require("cpjax");

module.exports = function(url, callback) {
  cpjax({ url: url, json: true, cors: true }, function(error, data) {
    if (error) {
      return callback(error);
    }
    let title = "";
    let doc = document.implementation.createHTMLDocument("titleContainer");
    doc.documentElement.innerHTML = data;

    if (doc.title !== "") {
      title = doc.title;
    } else {
      title = url;
    }
    callback(null, title);
  });
};
