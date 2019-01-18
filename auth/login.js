const righto = require("righto");
const language = require("../language");
const util = require("../util");
const db = require("../db");
const hash = require("./hash");
const token = require("./token");

function handlePassword(payload, response) {
  var user = righto(db.getUser, payload.username);
  var hashedPassword = user.get("hashedPassword");
  var validate = righto(hash.check, payload.password, hashedPassword);

  validate(function(error, result) {
    if (error || !result) {
      return util.respond.unauthorized(language.INVALID_PASSWORD, response);
    }
    if (result) {
      token.create(payload.username, function(error, token) {
        if (error) {
          return util.respond.unauthorized(language.INVALID_PASSWORD, response);
        }
        return util.respond.success(token, response);
      });
    }
  });
}

module.exports = function login(request, response) {
  util.getJSONfromRequest(request, function(err, payload) {
    if (err) {
      log.error(`[pocket] [Login] ${err}`);
      return util.respond.error(language.INVALID_AUTH, response);
    } else {
      if (!payload.username) {
        return util.respond.unauthorized(language.INVALID_USERNAME, response);
      }
      if (!payload.password) {
        return util.respond.unauthorized(language.INVALID_PASSWORD, response);
      }
      if (payload.username && payload.password) {
        return handlePassword(payload, response);
      }
    }
  });
};
