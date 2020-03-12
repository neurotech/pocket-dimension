const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient({ region: "us-west-1" });

function put(item, callback) {
  dynamo.put({ TableName: "pocket-dimension", Item: item }, error => {
    if (error) return callback(error);
    return callback();
  });
}

module.exports = { put };
