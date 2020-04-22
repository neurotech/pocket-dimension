const auth = require("./auth/index.js");
const db = require("./dynamo.js");
const uuid = require("./util/uuid.js");

function constructItem(payload) {
  let id = payload.id || uuid();
  let timestamp = payload.timestamp || new Date().toISOString();

  return {
    id: id,
    userId: payload.userId,
    timestamp: timestamp,
    title: payload.title,
    body: payload.body,
    type: payload.type || "note",
    generateTitle: payload.generateTitle || false,
    isArchived: false,
  };
}

function createItem(body, callback) {
  var item = constructItem(JSON.parse(body));
  db.create(item, (err) => {
    if (err) return callback(err);
    var response = {
      isBase64Encoded: false,
      statusCode: 200,
      headers: {},
      body: JSON.stringify(item),
    };
    callback(null, response);
  });
}

function getItems(userId, archived, callback) {
  db.get(userId, archived, (error, results) => {
    if (error) return callback(error);
    var response = {
      isBase64Encoded: false,
      statusCode: 200,
      headers: {},
      body: JSON.stringify(results),
    };
    callback(null, response);
  });
}

function updateItem(id, timestamp, item, callback) {
  db.update(id, timestamp, item, (error, results) => {
    if (error) return callback(error);

    var response = {
      isBase64Encoded: false,
      statusCode: 200,
      headers: {},
      body: JSON.stringify(results),
    };
    callback(null, response);
  });
}

function deleteItem(id, timestamp, callback) {
  db.remove(id, timestamp, (error, results) => {
    if (error) return callback(error);

    var response = {
      isBase64Encoded: false,
      statusCode: 200,
      headers: {},
      body: JSON.stringify(results),
    };
    callback(null, response);
  });
}

exports.handler = (event, _, callback) => {
  // Authenticate
  auth.validateSessionToken(event, (error) => {
    if (error) return callback(error);
    // Token is valid, continue to routing

    // Create an Item
    if (event.path === "/items/create") {
      if (event.httpMethod === "POST") {
        return createItem(event.body, callback);
      }
    }

    // Retrieve Items
    if (event.path === "/items/all") {
      if (event.httpMethod === "GET") {
        return getItems(authenticated.userId, false, callback);
      }
    }

    if (event.path === "/items/archived") {
      if (event.httpMethod === "GET") {
        return getItems(authenticated.userId, true, callback);
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
          return callback("Missing ID or timestamp!");
        }
      }
    }

    return callback("notfound");
  });
};
