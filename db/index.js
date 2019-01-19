const AWS = require("aws-sdk");
const tiny = require("tiny-json-http");
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
  function putItem(item, callback) {
    dynamo.put(item, function(error) {
      if (error) {
        console.error(error);
        util.respond.error("Could not create your post. Please try again.", response);
        return callback(error);
      } else {
        util.respond.success("Successfully created post.", response);
        return callback();
      }
    });
  }

  if (item.Item.generateTitle) {
    tiny.get({ url: item.Item.body }, function(error, data) {
      if (error) {
        return;
      }
      var parsed = util.matchTitle(data.body);
      var title = !parsed ? item.Item.body : unescape(parsed);
      item.Item.title = title;
      putItem(item, callback);
    });
  } else {
    putItem(item, callback);
  }
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

function storeToken(payload, callback) {
  dynamo.update(queries.storeToken(payload), function(err) {
    if (err) return callback(err);
    return callback();
  });
}

function getUser(username, callback) {
  dynamo.query(queries.getUser(username), function(err, data) {
    if (err) return callback(err);
    callback(null, data.Items[0] || {});
  });
}

function getUserByToken(token, callback) {
  dynamo.scan(queries.getAllUsers(), function(err, data) {
    if (err) {
      return callback(err);
    }
    if (data.Items.length > 0) {
      var user = data.Items.filter(item => {
        return item.sessionToken === token || item.apiToken === token;
      });
      return callback(null, user[0]);
    }
  });
}

module.exports = { get, put, update, remove, storeToken, getUser, getUserByToken };
