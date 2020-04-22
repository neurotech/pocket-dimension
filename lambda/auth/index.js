const righto = require("righto");
const authenticate = require("./authenticate.js");
const login = require("./login.js");
const token = require("./token.js");

function validateSessionToken(event, callback) {
  var sessionToken = token.getTokenFromHeaders(event.headers);

  if (!sessionToken) {
    return callback("invalid auth");
  }

  var authenticated = righto(authenticate, sessionToken).get((user) => {
    if (user) {
      return user;
    } else {
      return righto.fail("invalid auth");
    }
  });

  authenticated(callback);
}

module.exports = { login, authenticate, validateSessionToken };
