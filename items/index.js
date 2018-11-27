const dynamo = require("../dynamo");
const id = require("../id");
const log = require("../log");

function createItem(request, response, tokens) {
  let now = new Date();
  let query = {
    TableName: "pocket-dimension",
    Item: {
      id: id.generate(),
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
    TableName: "pocket-dimension",
    ExpressionAttributeValues: {
      ":t": 0
    },
    FilterExpression: "id > :t"
  };

  dynamo.scan(query, function(err, data) {
    if (err || data.Items.length === 0) log.error(err);
    console.log(data.Items);
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
