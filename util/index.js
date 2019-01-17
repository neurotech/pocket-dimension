const uuid = require("../uuid");
const now = require("../get-now");

const contentType = { "Content-Type": "application/json" };

function responseHandler(code, status, data, response) {
  response.writeHead(code, contentType);
  response.write(
    JSON.stringify({
      status: status,
      data: data
    })
  );
  response.end();
}

const util = {
  buildItem: function createItemObject(payload) {
    let item = {
      TableName: "pocket-dimension",
      Item: {
        id: uuid(),
        timestamp: now(),
        title: payload.title || "",
        body: payload.body || "",
        type: payload.type || "note"
      }
    };
    return item;
  },
  getJSONfromRequest: function parsePayload(request, callback) {
    let payload = "";
    request.on("data", function(data) {
      payload += data;
    });
    request.on("error", function(err) {
      callback(err);
    });
    request.on("end", function() {
      let parsed = JSON.parse(payload);
      callback(null, parsed);
    });
  },
  respond: {
    success: function successResponse(data, response) {
      return responseHandler(200, "SUCCESS", data, response);
    },
    error: function errorResponse(data, response) {
      return responseHandler(500, "ERROR", data.message, response);
    }
  }
};

module.exports = util;
