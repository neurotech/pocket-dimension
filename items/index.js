const AWS = require("aws-sdk");
const log = require("../log");
if (process.env.NODE_ENV === "development") require("dotenv").config();

AWS.config.update({
  credentials: {
    accessKeyId: process.env.POCKET_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.POCKET_AWS_ACCESS_KEY_SECRET
  },
  region: process.env.POCKET_AWS_REGION
});

let dynamo = new AWS.DynamoDB.DocumentClient();

function createItem(request, response, tokens) {}

module.exports = {
  create: createItem,
  get: "",
  update: "",
  delete: ""
};
