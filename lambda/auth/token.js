const righto = require("righto");
const Cryptr = require("cryptr");
const uuid = require("../util/uuid.js");
const dynamo = require("../dynamo.js");
const getParameters = require("../util/getParameters.js");

const parameters = righto(getParameters);
const key = parameters.get((parameters) => {
  return parameters.POCKET_DIMENSION_SECRET_KEY;
});
const getCryptr = key.get((key) => new Cryptr(key));

function encrypt(cryptr, value, callback) {
  return callback(null, cryptr.encrypt(value));
}

function decrypt(cryptr, encryptedValue, callback) {
  try {
    return callback(null, cryptr.decrypt(encryptedValue));
  } catch (error) {
    callback(error);
  }
}

module.exports = {
  create: function createNewToken(username, callback) {
    // Create new token as UUID
    var token = uuid();
    // Store supplied username and NEW TOKEN in pocket-dimension-auth
    var tokenStored = righto(dynamo.storeToken, { username: username, token: token });
    // Use cryptr.encrypt to encrypt the NEW TOKEN
    var tokenHash = righto.sync(encrypt, getCryptr, token, righto.after(tokenStored));
    // Callback error, results
    tokenHash(callback);
  },
  check: function checkToken(sessionToken, callback) {
    // Attempt to use cryptr to decrypt SESSION TOKEN, return error
    var token = righto(decrypt, getCryptr, sessionToken);
    // Lookup pocket-dimension-auth table for any records matching DECRYPTED TOKEN
    var user = righto(dynamo.getUserByToken, token);
    var result = user.get("username");
    result(callback);
  },
  decrypt: function decryptToken(sessionToken, callback) {
    var decrypted = righto(decrypt, getCryptr, sessionToken);
    decrypted(callback);
  },
  getTokenFromHeaders: function getToken(headers) {
    var authorization = headers["Authorization"];
    if (authorization) {
      return authorization.split("Bearer ")[1];
    }
  },
};
