const tiny = require("tiny-json-http");
const unescape = require("unescape");
const responses = require("./util/responses.js");

function matchTitle(html) {
  var match = html.match(/<title>(.*?)<\/title>/);
  if (!match) return;
  return match[1];
}

function processHtml(html) {
  let matchedTitle = matchTitle(html);
  return !matchedTitle ? url : unescape(matchedTitle);
}

module.exports = function getPageInfoFromUrl(url, callback) {
  tiny.get({ url }, (error, response) => {
    if (error) return callback(responses.error(error));

    let title = processHtml(response.body);

    callback(null, responses.success({ title }));
  });
};
