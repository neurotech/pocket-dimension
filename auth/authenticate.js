function handleToken() {}

module.exports = function authenticate(request, response) {
  util.getJSONfromRequest(request, function(err, payload) {
    if (err) {
      log.error(`[pocket] [Login] ${err}`);
      return util.respond.error(language.INVALID_AUTH, response);
    } else {
      if (!payload.token) {
        return util.respond.unauthorized(language.INVALID_AUTH, response);
      } else {
        return handleToken(payload, response);
      }
    }
  });
};
