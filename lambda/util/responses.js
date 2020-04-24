module.exports = {
  error: function buildErrorResponse(error) {
    let response = {
      isBase64Encoded: false,
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(error),
    };
    return response;
  },
  success: function buildSuccessResponse(results) {
    let response = {
      isBase64Encoded: false,
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(results),
    };
    return response;
  },
  unauthorised: function buildUnauthorisedResponse(message) {
    let response = {
      isBase64Encoded: false,
      statusCode: 401,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(message),
    };
    return response;
  },
};
