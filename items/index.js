const AWS = require("aws-sdk");
const util = require("../util");
const uuid = require("../uuid");
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

function create(request, response, tokens) {
  util.getPayload(request, function(err, payload) {
    if (err) {
      util.respond(
        500,
        "ERROR",
        "Could not create your post. Please try again.",
        response
      );
      return log.error(`[pocket] [Get Payload] ${err}`);
    } else {
      let item = {
        TableName: "pocket-dimension",
        Item: {
          id: uuid(),
          timestamp: new Date().toISOString(),
          title: payload.title || "",
          body: payload.body || "",
          type: payload.type || "note"
        }
      };
      dynamo.put(item, function(err) {
        if (err) {
          util.respond(
            500,
            "ERROR",
            "Could not create your post. Please try again.",
            response
          );
          return log.error(`[DynamoDB] [Create Item] ${err}`);
        } else {
          util.respond(200, "SUCCESS", "Successfully created post.", response);
        }
      });
    }
  });
}

module.exports = {
  create: create,
  get: "",
  update: "",
  delete: ""
};
