const righto = require("righto");
const Cryptr = require("cryptr");
const uuid = require("../uuid");
const db = require("../db");
const cryptr = new Cryptr(process.env.POCKET_SECRET_KEY);

module.exports = {
  create: function createNewToken(username, callback) {
    // Create new token as UUID
    var token = uuid();

    // Store supplied username and new token in AUTH DB
    var tokenStored = righto(db.storeToken, { username: username, token: token });

    // Use cryptr.encrypt to encrypt the token
    var tokenHash = righto.sync(cryptr.encrypt, token, righto.after(tokenStored));

    // Callback error, results
    tokenHash(callback);
  },
  check: ""
};
