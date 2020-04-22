const AWS = require("aws-sdk");

function mapParametersToObject(parameters) {
  return parameters.reduce((result, param) => {
    result[param.Name] = param.Value;
    return result;
  }, {});
}

module.exports = function getParameters(callback) {
  let ssm = new AWS.SSM();
  let paramsRequest = {
    Names: ["POCKET_DIMENSION_SECRET_KEY"],
    WithDecryption: true,
  };

  ssm.getParameters(paramsRequest, function (error, data) {
    callback(error, mapParametersToObject(data.Parameters));
  });
};
