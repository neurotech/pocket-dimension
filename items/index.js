const db = require("../db");
const language = require("../language");
const util = require("../util");
const log = require("../log");

function create(request, response) {
  util.getPayload(request, function(err, payload) {
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
  if (!tokens.id || tokens.id === "all")
    return util.respond.success("all", response);

  if (!isNaN(parseInt(tokens.id, 10)))
    return util.respond.success(`item ${tokens.id}`, response);

  switch (tokens.id) {
    case "latest":
      db.get.all(10, function(err, data) {
        if (err) return util.respond.error(err, response);
        util.respond.success(data, response);
      });
      break;

    case "notes":
      util.respond.success("notes", response);
      break;

    case "links":
      util.respond.success("links", response);
      break;

    case "todo":
      util.respond.success("todo", response);
      break;

    default:
      util.respond.success("all", response);
      break;
  }
}

module.exports = {
  create: create,
  get: get,
  update: "",
  delete: ""
};
