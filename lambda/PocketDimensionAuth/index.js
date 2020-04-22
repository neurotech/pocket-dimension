exports.handler = (event, context, callback) => {
  var response = {
    isBase64Encoded: false,
    statusCode: 200,
    headers: {},
    body: "!",
  };
  callback(null, response);
};
