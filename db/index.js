const righto = require("righto");
const alternator = require("alternator");
const user = require("../user");
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
  all: function getAllItems(scope, callback) {
    let userFromRequest = righto(user.getUserFromRequest, scope.request);
    let userId = userFromRequest.get("userId");

    let all = dynamo.table("pocket-dimension").scan({
      expression:
        "userId = :userId and (isArchived = :isArchived or attribute_not_exists(isArchived))",
      attributeValues: {
        ":userId": userId,
        ":isArchived": false
      }
    });
    let result = all.get(data =>
      data.rows.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    );

    result(callback);
  },
  archived: function getAllArchivedItems(scope, callback) {
    let userFromRequest = righto(user.getUserFromRequest, scope.request);
    let userId = userFromRequest.get("userId");

    let all = dynamo.table("pocket-dimension").scan({
      expression: "userId = :userId and isArchived = :isArchived",
      attributeValues: {
        ":userId": userId,
        ":isArchived": true
      }
    });
    let result = all.get(data =>
      data.rows.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    );

    result(callback);
  }
};

function put(item, scope, callback) {
  let userFromRequest = righto(user.getUserFromRequest, scope.request);
  let userId = userFromRequest.get("userId");

  item.item.userId = userId;

  let saved = dynamo.table("pocket-dimension").create(item);

  saved(callback);
}

function update(item, callback) {
  let updated = dynamo.table("pocket-dimension").update({
    key: { id: item.id, timestamp: item.timestamp },
    item: {
      title: item.title,
      body: item.body,
      type: item.type,
      isArchived: item.isArchived
    }
  });

  updated(callback);
}

function remove(id, timestamp, callback) {
  dynamo.table("pocket-dimension").remove({ key: { id, timestamp } }, callback);
}

function storeToken(payload, callback) {
  let tokenStored = dynamo.table("pocket-dimension-auth").update({
    key: {
      username: payload.username
    },
    item: {
      sessionToken: payload.token
    }
  });

  tokenStored(callback);
}

function getUser(username, callback) {
  let user = dynamo.table("pocket-dimension-auth").get({
    key: {
      username: username
    }
  });

  user(callback);
}

function getUserByToken(token, callback) {
  let results = dynamo.table("pocket-dimension-auth").scan({
    expression: "sessionToken = :token or apiToken = :token",
    attributeValues: {
      ":token": token
    }
  });

  let result = results.get(results => {
    if (!results.rows.length) {
      return righto.fail({ code: 401, message: "token not found" });
    }

    return results.rows[0];
  });

  result(callback);
}

module.exports = { get, put, update, remove, storeToken, getUser, getUserByToken };
