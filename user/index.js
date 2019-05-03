module.exports = {
  getUserFromRequest: function getUserFromRequest(request, callback) {
    let righto = require("righto");
    let token = require("../auth/token");
    let db = require("../db");

    let tokenFromHeaders = token.getTokenFromHeaders(request.headers);
    let sessionToken = righto(token.decrypt, tokenFromHeaders);
    let requesterToken = sessionToken.get(sToken => sToken);
    let requesterUser = righto(db.getUserByToken, requesterToken);

    requesterUser(callback);
  }
};
