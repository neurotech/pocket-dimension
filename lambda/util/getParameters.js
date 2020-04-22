const AWS = require("aws-sdk");
const righto = require("righto");

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
  let parameters = righto(ssm.getParameters, paramsRequest).get((data) =>
    mapParametersToObject(data.Parameters)
  );
  parameters(callback);
};
