const righto = require("righto");
const language = require("../language");
const util = require("../util");
const hash = require("./hash");

module.exports = function authenticate(request, response) {
  util.getJSONfromRequest(request, function(err, payload) {
    if (err) {
      util.respond.error(language.INVALID_AUTH, response);
      return log.error(`[pocket] [Authenticate] ${err}`);
    } else {
      if (payload.token) {
        if (payload.token === "correct") {
          return util.respond.success(payload.token, response);
        } else {
          return util.respond.unauthorized(language.INVALID_AUTH, response);
        }
      }
      if (payload.password) {
        var users = "A table of usernames with hashed passwords";
        var valid = righto(hash.check, payload.password, users[payload.username]);
        valid(function(error, result) {
          if (error) {
            return util.respond.unauthorized(language.INVALID_AUTH, response);
          }

          return util.respond.success(result, response);
        });
      }
    }
  });
};
