const AWS = require("aws-sdk");
const util = require("../util");
if (process.env.NODE_ENV === "development") require("dotenv").config();

AWS.config.update({
  credentials: {
    accessKeyId: process.env.POCKET_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.POCKET_AWS_ACCESS_KEY_SECRET
  },
  region: process.env.POCKET_AWS_REGION
});

let dynamo = new AWS.DynamoDB.DocumentClient();

function put(item, response, callback) {
  dynamo.put(item, function(err) {
    if (err) {
      util.respond.error(
        "Could not create your post. Please try again.",
        response
      );
      return callback(err);
    } else {
      util.respond.success("Successfully created post.", response);
      return callback();
    }
  });
}

module.exports = { put };
