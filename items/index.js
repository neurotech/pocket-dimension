const querystring = require("querystring");
const db = require("../db");
const auth = require("../auth");
const token = require("../auth/token");
const language = require("../language");
const util = require("../util");
const log = require("../log");

function create(request, response) {
  var sessionToken = token.getTokenFromHeaders(request.headers);
  if (!sessionToken) {
    return util.respond.unauthorized(language.INVALID_AUTH, response);
  } else {
    auth.authenticate(sessionToken, function(valid) {
      if (!valid) {
        return util.respond.unauthorized(language.INVALID_AUTH, response);
      }
      util.getJSONfromRequest(request, function(err, payload) {
        if (err) {
          util.respond.error(language.COULD_NOT_CREATE_POST, response);
          return log.error(`[pocket] [Get Payload] ${err}`);
        } else {
          let item = util.buildItem(payload);
          db.put(item, response, function(err) {
            if (err) return util.respond.error(err, response);

            return util.respond.success(language.POST_CREATED, response);
          });
        }
      });
    });
  }
}

function get(request, response, tokens) {
  switch (request.url) {
    case "/api/items/all":
      var sessionToken = token.getTokenFromHeaders(request.headers);
      if (!sessionToken) {
        return util.respond.unauthorized(language.INVALID_AUTH, response);
      } else {
        auth.authenticate(sessionToken, function(valid) {
          if (!valid) {
            return util.respond.unauthorized(language.INVALID_AUTH, response);
          }
          db.get.all(function(err, data) {
            if (err) return util.respond.error(err, response);
            return util.respond.success(data, response);
          });
        });
      }
      break;

    default:
      util.respond.unauthorized(language.INVALID_AUTH, response);
      break;
  }
}

function update(request, response) {
  var sessionToken = token.getTokenFromHeaders(request.headers);
  if (!sessionToken) {
    return util.respond.unauthorized(language.INVALID_AUTH, response);
  } else {
    auth.authenticate(sessionToken, function(valid) {
      if (!valid) {
        return util.respond.unauthorized(language.INVALID_AUTH, response);
      }
      util.getJSONfromRequest(request, function(err, payload) {
        if (err) {
          util.respond.error(language.COULD_NOT_UPDATE_POST, response);
          return log.error(`[pocket] [Update Post] ${err}`);
        } else {
          db.update(payload, function(err) {
            if (err) return util.respond.error(err, response);
            util.respond.success("Successfully updated post.", response);
          });
        }
      });
    });
  }
}

function remove(request, response) {
  var sessionToken = token.getTokenFromHeaders(request.headers);
  if (!sessionToken) {
    return util.respond.unauthorized(language.INVALID_AUTH, response);
  } else {
    auth.authenticate(sessionToken, function(valid) {
      if (!valid) {
        return util.respond.unauthorized(language.INVALID_AUTH, response);
      }
      var querystring = getQueryString(request.url);
      if (querystring) {
        db.remove(querystring.id, querystring.timestamp, function(err) {
          if (err) return util.respond.error(err, response);
          util.respond.success("Successfully deleted item.", response);
        });
      }
    });
  }
}

function getQueryString(url) {
  var params = url.split("?")[1];
  var qs = querystring.parse(params);

  return qs;
}

module.exports = {
  create: create,
  get: get,
  update: update,
  delete: remove
};
