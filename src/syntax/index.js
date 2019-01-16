const hljs = require("highlight.js");

module.exports = {
  highlight: function highlight(code, lang, callback) {
    var highlighted = hljs.highlight(lang, code, false);
    callback(null, highlighted.value);
  }
};
