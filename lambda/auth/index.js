const righto = require("righto");
const authenticate = require("./authenticate.js");
const login = require("./login.js");
const token = require("./token.js");

function validateSessionToken(event, callback) {
  var sessionToken = token.getTokenFromHeaders(event.headers);

  if (!sessionToken) {
    return callback("invalid auth");
  }

  authenticate(sessionToken, callback);
}

module.exports = { login, authenticate, validateSessionToken };
