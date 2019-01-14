module.exports = function getNow() {
  let now = new Date().toISOString();
  return now;
};
