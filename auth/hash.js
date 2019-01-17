const bcrypt = require("bcrypt");

module.exports = {
  create: function hashPassword(password, callback) {
    bcrypt.hash(password, 10, function(error, hash) {
      if (error) {
        return callback(error);
      }
      return callback(null, hash);
    });
  },
  check: function comparePasswordWithHash(password, hashed, callback) {
    bcrypt.compare(password, hashed, function(error, valid) {
      if (error) {
        return callback(error);
      }
      return callback(null, valid);
    });
  }
};
