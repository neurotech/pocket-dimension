const AWS = require("aws-sdk");
const log = require("../log");

AWS.config.update({
  credentials: {
    accessKeyId: process.env.POCKET_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.POCKET_AWS_ACCESS_KEY_SECRET
  },
  region: "us-west-1"
});

let dynamo = new AWS.DynamoDB.DocumentClient();

function createItem(request, response, tokens) {
  let now = new Date();
  let query = {
    TableName: "pocket-dimension",
    Item: {
      "item-id": Number(1),
      timestamp: now.toString()
    }
  };
  dynamo.put(query, function(err, data) {
    if (err) log.error(err);

    console.log(data);
  });
}

function getItems(request, response, tokens) {
  let query = {
    TableName: "pocket-dimension"
    // ExpressionAttributeValues: {
    //   ":t": timestamp
    // }
    // KeyConditionExpression: "discordToken = :t"
  };

  dynamo.scan(query, function(err, data) {
    if (err || data.Items.length === 0) log.error(err);

    console.log(data);
  });
}

function updateItem(request, response, tokens) {}

function deleteItems(request, response, tokens) {}

module.exports = {
  create: createItem,
  get: getItems,
  update: "",
  delete: ""
};
