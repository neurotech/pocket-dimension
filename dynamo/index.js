const AWS = require("aws-sdk");

AWS.config.update({
  credentials: {
    accessKeyId: process.env.POCKET_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.POCKET_AWS_ACCESS_KEY_SECRET
  },
  region: process.env.POCKET_AWS_REGION
});

let dynamo = new AWS.DynamoDB.DocumentClient();

module.exports = dynamo;
