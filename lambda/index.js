const db = require("./dynamo.js");

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

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

function getItems(archived, callback) {
  db.get("1", archived, (error, results) => {
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

exports.handler = (event, context, callback) => {
  // Create an Item
  if (event.path === "/api/items/create") {
    if (event.httpMethod === "POST") {
      return createItem(event.body, callback);
    }
  }

  // Retrieve Items
  if (event.path === "/api/items/all") {
    if (event.httpMethod === "GET") {
      return getItems(false, callback);
    }
  }

  if (event.path === "/api/items/archived") {
    if (event.httpMethod === "GET") {
      return getItems(true, callback);
    }
  }

  // Update Item
  if (event.path === "/api/item/update") {
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
  if (event.path === "/api/item/delete") {
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
};
