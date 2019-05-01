const querystring = require("querystring");
const db = require("../db");
const auth = require("../auth");
const language = require("../language");
const util = require("../util");
const log = require("../log");
const righto = require("righto");
const tiny = require("tiny-json-http");

const validateSessionToken = auth.validateSessionToken;

function create(scope, tokens, data, callback) {
  var authenticated = righto(validateSessionToken, scope);

  if (data.generateTitle) {
    var titleBody = righto(tiny.get, { url: data.body }, righto.after(authenticated));

    data.title = titleBody.get(data => {
      let parsed = util.matchTitle(data.body);
      return !parsed ? data.body : unescape(parsed);
    });
  }

  let item = righto.sync(util.buildItem, righto.resolve(data), righto.after(authenticated));

  let saved = righto(db.put, item);

  let created = saved.get(() => ({ status: language.POST_CREATED }));

  created(callback);
}

function get(scope, tokens, callback) {
  var authenticated = righto(validateSessionToken, scope);

  var items = righto(db.get.all, authenticated);

  let result = items.get(items => ({ data: items }));

  result(callback);
}

function update(scope, tokens, data, callback) {
  var authenticated = righto(validateSessionToken, scope);

  var updated = righto(db.update, data, righto.after(authenticated));

  let result = updated.get(() => ({ status: language.POST_UPDATED }));

  result(callback);
}

function remove(scope, tokens, callback) {
  var querystring = getQueryString(scope.request.url);
  var authenticated = righto(validateSessionToken, scope);

  if (!querystring || !querystring.id || !querystring.timestamp) {
    return callback(url.errors.badRequest("querystring values of timestamp and id are required"));
  }

  var removed = righto(
    db.remove,
    querystring.id,
    querystring.timestamp,
    righto.after(authenticated)
  );

  var result = removed.get(() => ({ status: "Successfully deleted item." }));

  result(callback);
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
