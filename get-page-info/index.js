const tiny = require("tiny-json-http");
const unescape = require("unescape");
const util = require("../util");
const language = require("../language");
const auth = require("../auth");
const token = require("../auth/token");
const righto = require("righto");

const validateSessionToken = auth.validateSessionToken;

module.exports = function(scope, tokens, callback) {
  var authenticated = righto(validateSessionToken, scope);

  var titleBody = righto(tiny.get, { url: payload.body }, righto.after(authenticated));

  var title = titleBody.get(data => {
    let parsed = util.matchTitle(data.body);
    return !parsed ? payload.body : unescape(parsed);
  });

  var result = title.get(title => ({ title }));

  result(callback);
};
