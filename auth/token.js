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
  check: function checkToken(sessionToken, callback) {
    // Attempt to`cryptr.decrypt` SESSION-TOKEN, return error
    var token = righto.sync(function() {
      try {
        return cryptr.decrypt(sessionToken);
      } catch (error) {
        return righto.fail(false);
      }
    });

    // Lookup AUTH table for any records matching DECRYPTED-TOKEN
    var user = token.get(token => {
      return righto(db.getUserByToken, token);
    });

    var result = righto.handle(user.get("username"), function(error, valid) {
      if (error) {
        return callback(error);
      }
      return callback(null, valid);
    });

    result(callback);
  },
  decrypt: function decryptToken(sessionToken, callback) {
    var decrypted = righto.sync(cryptr.decrypt, sessionToken);
    decrypted(callback);
  },
  getTokenFromHeaders: function getToken(headers) {
    var authorization = headers["authorization"];

    if (authorization) {
      return authorization.split("Bearer ")[1];
    }
  }
};
