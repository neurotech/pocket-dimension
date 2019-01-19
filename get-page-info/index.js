const tiny = require("tiny-json-http");
const unescape = require("unescape");
const util = require("../util");
const language = require("../language");
const auth = require("../auth");
const token = require("../auth/token");

function matchTitle(data) {
  var match = data.match(/\<title.*\>([^]*)\<\/title\>/);

  if (!match) {
    return;
  }

  return match[1];
}

module.exports = function(request, response) {
  var sessionToken = token.getSessionTokenFromHeaders(request.headers);
  if (!sessionToken) {
    return util.respond.unauthorized(language.INVALID_AUTH, response);
  } else {
    util.getJSONfromRequest(request, function(err, payload) {
      if (err) {
        util.respond.error(language.COULD_NOT_PARSE_REQUEST_BODY, response);
        return log.error(`[pocket] [Get Page Info] ${err}`);
      } else {
        auth.authenticate(sessionToken, function(valid) {
          if (!valid) {
            return util.respond.unauthorized(language.INVALID_AUTH, response);
          }
          tiny.get({ url: payload }, function(error, data) {
            if (error) return util.respond.error(error, response);

            var parsed = matchTitle(data.body);
            var title = !parsed ? payload : unescape(parsed);

            util.respond.success({ title }, response);
          });
        });
      }
    });
  }
};
