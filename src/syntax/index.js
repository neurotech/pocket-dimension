const hljs = require("highlight.js");

module.exports = function highlight(code, lang, callback) {
  var highlighted = hljs.highlight(lang, code, false);
  callback(null, highlighted.value);
};
