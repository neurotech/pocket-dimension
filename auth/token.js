const righto = require("righto");
const cryptr = require("cryptr");
const uuid = require("../uuid");

module.exports = {
  create: function createNewToken(connection, accountId, callback) {
    // Create new token as UUID
    var token = uuid();

    // Store supplied ID and new token in AUTH DB
    // api.storeToken
    var tokenStored = righto.from(
      r
        .table("accountToken")
        .insert({
          accountId,
          token
        })
        .run(connection)
    );

    // Use cryptr.encrypt to encrypt the token
    var tokenHash = righto.sync(cryptr.encrypt, token, righto.after(tokenStored));

    // Callback error, results
    tokenHash(callback);
  },
  check: ""
};
