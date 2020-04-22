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

function create(item, callback) {
  dynamo.put({ TableName: "pocket-dimension", Item: item }, (error) => {
    if (error) return callback(error);
    return callback();
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

module.exports = { create, get, update, remove };