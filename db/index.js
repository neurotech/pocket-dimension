const AWS = require("aws-sdk");
const queries = require("./queries");
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

let get = {
  all: function getAllItems(callback) {
    dynamo.scan(queries.getAll(), function(err, data) {
      if (err) return callback(err);
      let all = data.Items.sort(function(a, b) {
        // Thanks to @korynunn
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
      callback(null, all);
    });
  }
};

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

function update(item, callback) {
  dynamo.update(queries.updateItem(item), function(err) {
    if (err) return callback(err);
    return callback();
  });
}

function remove(id, timestamp, callback) {
  dynamo.delete(queries.removeItem(id, timestamp), function(err) {
    if (err) return callback(err);
    return callback();
  });
}

module.exports = { get, put, update, remove };
