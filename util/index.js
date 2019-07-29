const uuid = require("../uuid");
const now = require("../get-now");

const defaultHeaders = { "Content-Type": "application/json" };

function responseHandler(method) {
  return function() {
    var [request, response, ...args] = Array.from(arguments);
    var scope = {
      request,
      response
    };

    method.apply(
      null,
      [scope].concat(args).concat(function(error, result) {
        var code, status;

        if (error) {
          var message = "An error occurred.";
          var code = 500;
          if (error.code) {
            code = error.code;
            message = error.message;
          }
          status = error.status || "ERROR";
          response.writeHead(code, defaultHeaders);
          response.end(
            JSON.stringify({
              status,
              data: message
            })
          );
          return;
        }

        code = result.code || 200;
        status = result.status || "SUCCESS";

        response.writeHead(code, defaultHeaders);
        response.write(
          JSON.stringify({
            ...result,
            status
          })
        );
        response.end();
      })
    );
  };
}

const util = {
  responseHandler,
  buildItem: function createItemObject(payload) {
    var id = payload.id || uuid();
    var timestamp = payload.timestamp || now();

    let item = {
      key: { id: id, timestamp: timestamp },
      item: {
        id: id,
        timestamp: timestamp,
        title: payload.title || "Untitled",
        body: payload.body || "Untitled",
        type: payload.type || "note",
        generateTitle: payload.generateTitle || false
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
  errors: {
    error: function errorError(message) {
      return { code: 500, status: "ERROR", message };
    },
    unauthorized: function unauthorizedError(message) {
      return { code: 401, status: "UNAUTHORIZED", message };
    },
    badRequest: function unauthorizedError(message) {
      return { code: 400, status: "BAD REQUEST", message };
    }
  },
  matchTitle: function matchTitle(data) {
    var match = data.match(/\<title.*\>([^]*)\<\/title\>/);

    if (!match) {
      return;
    }

    return match[1];
  }
};

module.exports = util;
