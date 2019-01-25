const token = require("./token");

module.exports = function authenticate(sessionToken, callback) {
  if (!sessionToken) {
    return callback(false);
  } else {
    token.check(sessionToken, function(error, valid) {
      if (error || !valid) {
        return callback(false);
      }

      callback(valid);
    });
  }
};
