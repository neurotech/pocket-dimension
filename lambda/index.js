const auth = require("./auth/index.js");
const db = require("./dynamo.js");
const responses = require("./util/responses.js");
const getPageInfo = require("./util/getPageInfo.js");
const uuid = require("./util/uuid.js");

function constructItem(payload) {
  let id = payload.id || uuid();
  let timestamp = payload.timestamp || new Date().toISOString();

  return {
    id: id,
    userId: payload.userId,
    timestamp: timestamp,
    title: payload.title || "",
    body: payload.body,
    type: payload.type || "note",
    generateTitle: payload.generateTitle || false,
    isArchived: false,
  };
}

function createItem(userId, body, callback) {
  var item = constructItem(JSON.parse(body));
  console.warn(item);
  if (item.generateTitle || item.title === "") {
    getPageInfo(item.body, (error, pageInfo) => {
      if (error) return callback(responses.error(error));
      item.title = pageInfo.title;

      db.create(userId, item, (error, results) => {
        if (error) return callback(responses.error(error));
        callback(null, responses.success(results));
      });
    });
  } else {
    db.create(userId, item, (error, results) => {
      if (error) return callback(responses.error(error));
      callback(null, responses.success(results));
    });
  }
}

function getItems(userId, archived, callback) {
  db.get(userId.toString(), archived, (error, results) => {
    if (error) return callback(responses.error(error));
    callback(null, responses.success(results));
  });
}

function updateItem(id, timestamp, item, callback) {
  db.update(id, timestamp, item, (error, results) => {
    if (error) return callback(responses.error(error));
    callback(null, responses.success(results));
  });
}

function deleteItem(id, timestamp, callback) {
  db.remove(id, timestamp, (error, results) => {
    if (error) return callback(responses.error(error));
    callback(null, responses.success(results));
  });
}

exports.handler = (event, context, callback) => {
  // Login
  if (event.path === "/login") {
    if (event.httpMethod === "POST") {
      var body = JSON.parse(event.body);

      return auth.login(body, (error, results) => {
        if (error) return callback(responses.error(error));
        callback(null, responses.success(results));
      });
    }
  }

  // Authenticate
  auth.validateSessionToken(event, (error, user) => {
    if (error) return callback(responses.unauthorised(error));
    // Token is valid, continue to routing

    // Create an Item
    if (event.path === "/item/create") {
      if (event.httpMethod === "POST") {
        console.warn(user);
        return createItem(user.userId, event.body, callback);
      }
    }

    // Retrieve All Items
    if (event.path === "/items/all") {
      if (event.httpMethod === "GET") {
        getItems(user.userId, false, callback);
      }
    }

    // Retrieve Archived Items
    if (event.path === "/items/archived") {
      if (event.httpMethod === "GET") {
        return getItems(user.userId, true, callback);
      }
    }

    // Update Item
    if (event.path === "/item/update") {
      if (event.httpMethod === "PUT") {
        if (event.queryStringParameters.id && event.queryStringParameters.timestamp) {
          return updateItem(
            event.queryStringParameters.id,
            event.queryStringParameters.timestamp,
            JSON.parse(event.body),
            callback
          );
        }
      }
    }

    // Delete Item
    if (event.path === "/item/delete") {
      if (event.httpMethod === "DELETE") {
        if (event.queryStringParameters.id && event.queryStringParameters.timestamp) {
          return deleteItem(
            event.queryStringParameters.id,
            event.queryStringParameters.timestamp,
            callback
          );
        } else {
          return callback(responses.error("Missing ID or timestamp!"));
        }
      }
    }

    // Get Page Info
    if (event.path === "/get-page-info") {
      if (event.httpMethod === "POST") {
        return getPageInfo(JSON.parse(event.body), callback);
      }
    }
  });
};
