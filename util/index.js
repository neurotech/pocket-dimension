const util = {
  getPayload: function parsePayload(request, callback) {
    let payload = "";
    request.on("data", function(data) {
      payload += data;
    });
    request.on("error", function(err) {
      callback(err);
    });
    request.on("end", function() {
      let parsed = JSON.parse(payload);
      callback(null, parsed);
    });
  },
  respond: function performResponse(code, status, message, response) {
    response.writeHead(code, { "Content-Type": "application/json" });
    response.write(
      JSON.stringify({
        status: status,
        message: message
      })
    );
    response.end();
  }
};

module.exports = util;
