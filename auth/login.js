const righto = require("righto");
const language = require("../language");
const util = require("../util");
const db = require("../db");
const hash = require("./hash");
const token = require("./token");

function handlePassword(payload, callback) {
  var user = righto(db.getUser, payload.username);
  var hashedPassword = user.get("hashedPassword");
  var validate = righto(hash.check, payload.password, hashedPassword);
  var sessionToken = righto.handle(
    righto(token.create, payload.username, righto.after(validate)),
    (error, done) => done(util.errors.unauthorized(language.INVALID_PASSWORD))
  );

  var result = sessionToken.get(token => ({
    data: token
  }));

  result(callback);
}

module.exports = function login(scope, tokens, data, callback) {
  if (!data.username) {
    return callback(util.errors.unauthorized(language.INVALID_USERNAME));
  }
  if (!data.password) {
    return callback(util.errors.unauthorized(language.INVALID_PASSWORD));
  }

  handlePassword(data, callback);
};
