const righto = require("righto");
const dynamo = require("../dynamo.js");
const hash = require("./hash.js");
const token = require("./token.js");

function handlePassword(payload, callback) {
  var user = righto(dynamo.getUser, payload.username);
  var hashedPassword = user.get("hashedPassword");
  var validate = righto(hash.check, payload.password, hashedPassword);
  var sessionToken = righto.handle(
    righto(token.create, payload.username, righto.after(validate)),
    (error, done) => done("invalid password")
  );

  var result = sessionToken.get((token) => ({
    data: token,
  }));

  result(callback);
}

module.exports = function login(data, callback) {
  if (!data.username) {
    return callback("invalid username");
  }
  if (!data.password) {
    return callback("invalid password");
  }

  handlePassword(data, callback);
};
