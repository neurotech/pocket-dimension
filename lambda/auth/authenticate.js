const token = require("./token.js");

module.exports = function authenticate(sessionToken, callback) {
  if (!sessionToken) {
    return callback(null, false);
  } else {
    token.check(sessionToken, function (error, user) {
      if (error) return callback(error);
      if (!user) return callback(null, false);

      callback(null, user);
    });
  }
};
