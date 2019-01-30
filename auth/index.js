const util = require("../util");
const login = require("./login");
const authenticate = require("./authenticate");
const righto = require("righto");
const language = require("../language");

const token = require("../auth/token");

function validateSessionToken(scope, callback){
  var sessionToken = token.getTokenFromHeaders(scope.request.headers);

  if (!sessionToken) {
    return callback(util.error.unauthorized(language.INVALID_AUTH));
  }

  var authenticated = righto(authenticate, sessionToken)
    .get(valid => valid ? null : righto.fail(util.errors.unauthorized(language.INVALID_AUTH)));

  authenticated(callback);
}

module.exports = { login, authenticate, validateSessionToken };
