const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient({ region: "ap-southeast-2" });

// Thanks to @korynunn for these three functions ↓
function createAttributeValues(data) {
  var result = {};

  for (var key in data) {
    result[":" + key] = data[key];
  }

  return result;
}

function createAttributeNames(data) {
  var result = {};

  for (var key in data) {
    result["#" + key] = key;
  }

  return result;
}

function createUpdateExpression(data) {
  var result = [];

  for (var key in data) {
    result.push("#" + key + " = :" + key);
  }

  return "SET " + result.join(", ");
}
// Thanks to @korynunn for these three functions ↑

function create(userId, item, callback) {
  item.userId = userId;
  dynamo.put({ TableName: "pocket-dimension", Item: item }, (error, records) => {
    if (error) return callback(error);
    return callback(null, records);
  });
}

function get(userId, archived, callback) {
  dynamo.scan(
    {
      TableName: "pocket-dimension",
      FilterExpression: "userId = :userId and isArchived = :isArchived",
      ExpressionAttributeValues: {
        ":userId": userId,
        ":isArchived": archived,
      },
    },
    (error, records) => {
      if (error) return callback(error);
      let result = records.Items.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      return callback(null, result);
    }
  );
}

function update(id, timestamp, data, callback) {
  let item = {
    title: data.title,
    body: data.body,
    type: data.type,
    isArchived: data.isArchived || false,
  };

  let newItem = {
    TableName: "pocket-dimension",
    Key: { id: id, timestamp: timestamp },
    UpdateExpression: createUpdateExpression(item),
    ExpressionAttributeValues: createAttributeValues(item),
    ExpressionAttributeNames: createAttributeNames(item),
    ReturnValues: "ALL_NEW",
  };

  dynamo.update(newItem, callback);
}

function remove(id, timestamp, callback) {
  dynamo.delete({ TableName: "pocket-dimension", Key: { id: id, timestamp: timestamp } }, callback);
}

function storeToken(payload, callback) {
  let item = {
    sessionToken: payload.token,
  };

  let newItem = {
    TableName: "pocket-dimension-auth",
    Key: {
      username: payload.username,
    },
    UpdateExpression: createUpdateExpression(item),
    ExpressionAttributeValues: createAttributeValues(item),
    ExpressionAttributeNames: createAttributeNames(item),
    ReturnValues: "ALL_NEW",
  };

  dynamo.update(newItem, callback);
}

function getUser(username, callback) {
  let query = {
    TableName: "pocket-dimension-auth",
    Key: {
      username: username,
    },
  };

  dynamo.get(query, (error, results) => {
    if (error) return callback(error);
    if (!results.Item) return callback("user not found");

    callback(null, results.Item);
  });
}

function getUserByToken(token, callback) {
  let query = {
    TableName: "pocket-dimension-auth",
    FilterExpression: "sessionToken = :token or apiToken = :token",
    ExpressionAttributeValues: {
      ":token": token,
    },
  };

  dynamo.scan(query, (error, results) => {
    if (error) return callback(error);
    if (!results.Items.length) return callback("token not found");

    callback(null, results.Items[0]);
  });
}

module.exports = { create, get, update, remove, storeToken, getUser, getUserByToken };
