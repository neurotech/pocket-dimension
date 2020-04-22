const righto = require("righto");
const authenticate = require("./authenticate.js");
const login = require("./login.js");
const token = require("./token.js");

function validateSessionToken(scope, callback) {
  var sessionToken = token.getTokenFromHeaders(event.headers);

  if (!sessionToken) {
    return callback("invalid auth");
  }

  var authenticated = righto(authenticate, sessionToken).get((valid) =>
    valid ? null : righto.fail("invalid auth")
  );

  authenticated(callback);
}

module.exports = { login, authenticate, validateSessionToken };
