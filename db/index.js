const alternator = require("alternator");
const tiny = require("tiny-json-http");
const util = require("../util");
if (process.env.NODE_ENV === "development") require("dotenv").config();

let dynamo = alternator(
  {
    accessKeyId: process.env.POCKET_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.POCKET_AWS_ACCESS_KEY_SECRET,
    region: process.env.POCKET_AWS_REGION
  },
  [
    {
      name: "pocket-dimension",
      key: {
        id: "hash",
        timestamp: "range"
      }
    },
    {
      name: "pocket-dimension-auth",
      key: {
        username: "hash"
      }
    }
  ]
);

let get = {
  all: function getAllItems(callback) {
    dynamo.table("pocket-dimension").scan({}, function(err, data) {
      if (err) return callback(err);
      let all = data.rows.sort(function(a, b) {
        // Thanks to @korynunn
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
      callback(null, all);
    });
  }
};

function put(item, response, callback) {
  function putItem(item, callback) {
    dynamo.table("pocket-dimension").create(item, callback);
  }

  if (item.generateTitle) {
    tiny.get({ url: item.body }, function(error, data) {
      if (error) {
        return;
      }
      var parsed = util.matchTitle(data.body);
      var title = !parsed ? item.body : unescape(parsed);
      item.title = title;
      putItem(item, callback);
    });
  } else {
    putItem(item, callback);
  }
}

function update(item, callback) {
  dynamo.table("pocket-dimension").update(
    {
      key: { id: item.id, timestamp: item.timestamp },
      item: {
        title: item.title,
        body: item.body
      }
    },
    callback
  );
}

function remove(id, timestamp, callback) {
  dynamo.table("pocket-dimension").remove({ key: { id, timestamp } }, callback);
}

function storeToken(payload, callback) {
  dynamo.table("pocket-dimension-auth").update(
    {
      key: {
        username: payload.username
      },
      item: {
        sessionToken: payload.token
      }
    },
    callback
  );
}

function getUser(username, callback) {
  dynamo.table("pocket-dimension-auth").get(
    {
      key: {
        username: username
      }
    },
    callback
  );
}

function getUserByToken(token, callback) {
  dynamo.table("pocket-dimension-auth").scan({}, function(err, data) {
    if (err) {
      return callback(err);
    }
    if (data.rows.length > 0) {
      var user = data.rows.filter(item => {
        return item.sessionToken === token || item.apiToken === token;
      });
      return callback(null, user[0]);
    }
  });
}

module.exports = { get, put, update, remove, storeToken, getUser, getUserByToken };
