const querystring = require("querystring");
const db = require("../db");
const language = require("../language");
const util = require("../util");
const log = require("../log");

function create(request, response) {
  util.getJSONfromRequest(request, function(err, payload) {
    if (err) {
      util.respond.error(language.COULD_NOT_CREATE_POST, response);
      return log.error(`[pocket] [Get Payload] ${err}`);
    } else {
      let item = util.buildItem(payload);
      db.put(item, response, function(err) {
        if (err) log.error(`[DynamoDB] [Create Item] ${err}`);
      });
    }
  });
}

function get(request, response, tokens) {
  switch (request.url) {
    case "/api/items/all":
      db.get.all(function(err, data) {
        if (err) return util.respond.error(err, response);
        util.respond.success(data, response);
      });
      break;

    case "/api/items/latest":
      util.respond.success("latest", response);
      break;

    case "/api/items/notes":
      util.respond.success("notes", response);
      break;

    case "/api/items/links":
      util.respond.success("links", response);
      break;

    case "/api/items/todo":
      util.respond.success("todo", response);
      break;

    default:
      db.get.all(function(err, data) {
        if (err) return util.respond.error(err, response);
        util.respond.success(data, response);
      });
      break;
  }
}

function update(request, response) {
  util.getJSONfromRequest(request, function(err, payload) {
    if (err) {
      util.respond.error(language.COULD_NOT_CREATE_POST, response);
      return log.error(`[pocket] [Get Payload] ${err}`);
    } else {
      db.update(payload, function(err) {
        if (err) return util.respond.error(err, response);
        util.respond.success("Successfully deleted item.", response);
      });
    }
  });
}

function remove(request, response) {
  var querystring = getQueryString(request.url);
  if (querystring) {
    db.remove(querystring.id, querystring.timestamp, function(err) {
      if (err) return util.respond.error(err, response);
      util.respond.success("Successfully deleted item.", response);
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
