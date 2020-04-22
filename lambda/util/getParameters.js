const AWS = require("aws-sdk");

function mapParametersToObject(parameters) {
  return parameters.reduce((result, param) => {
    result[param.Name] = param.Value;
    return result;
  }, {});
}

function getParameters(callback) {
  let ssm = new AWS.SSM();
  let paramsRequest = {
    Names: ["POCKET_DIMENSION_SECRET_KEY"],
    WithDecryption: true,
  };
  let parameters = righto(ssm.getParameters, paramsRequest).get((data) =>
    mapParametersToObject(data.Parameters)
  );
  parameters(callback);
}

module.exports = function getParameters(callback) {
  let ssm = new AWS.SSM();
  let paramsRequest = {
    Names: ["POCKET_DIMENSION_SECRET_KEY"],
    WithDecryption: true,
  };

  ssm.getParameters(paramsRequest, function (error, data) {
    if (error) return callback(error);

    let parameters = {};
    data.Parameters.forEach((param) => {
      parameters[param.Name] = param.Value;
    });
    callback(null, parameters);
  });
};
