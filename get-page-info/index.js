const tiny = require("tiny-json-http");
const unescape = require("unescape");
const util = require("../util");
const language = require("../language");

function matchTitle(data) {
  var match = data.match(/\<title.*\>([^]*)\<\/title\>/);

  if (!match) {
    return;
  }

  return match[1];
}

module.exports = function(request, response) {
  util.getJSONfromRequest(request, function(err, payload) {
    if (err || !payload) {
      util.respond.error(language.COULD_NOT_PARSE_REQUEST_BODY, response);
      return log.error(`[pocket] [Get Page Info] ${err}`);
    } else {
      tiny.get({ url: payload.url }, function(error, data) {
        if (error) return util.respond.error(error, response);

        var parsed = matchTitle(data.body);
        var title = !parsed ? payload.url : unescape(parsed);

        util.respond.success({ title }, response);
      });
    }
  });
};
