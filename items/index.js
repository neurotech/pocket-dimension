<<<<<<< HEAD
if (process.env.NODE_ENV === "development") require("dotenv").config();

const db = require("../db");
const query = require("../query");
const log = require("../log");

function createItem(request, response, tokens) {}

function getItems(request, response, tokens) {
  db.connect();
  db.query("SELECT NOW()", (err, res) => {
    if (err) console.error(err);
    console.log(res.rows);
    db.end();
=======
const AWS = require("aws-sdk");
const log = require("../log");

AWS.config.update({
  credentials: {
    accessKeyId: process.env.POCKET_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.POCKET_AWS_ACCESS_KEY_SECRET
  },
  region: process.env.POCKET_AWS_REGION
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
>>>>>>> parent of 50c43d4... Bibbly boo
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
