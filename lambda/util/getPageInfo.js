const tiny = require("tiny-json-http");
const unescape = require("unescape");
const responses = require("./responses.js");

function matchTitle(html) {
  var match = html.match(/<title>(.*?)<\/title>/);
  if (!match) return;
  return match[1];
}

function processHtml(html, originalUrl) {
  let matchedTitle = matchTitle(html);
  return !matchedTitle ? originalUrl : unescape(matchedTitle);
}

module.exports = function getPageInfoFromUrl(url, callback) {
  tiny.get({ url }, (error, response) => {
    if (error) return callback(null, { title: url });

    let title = processHtml(response.body, url);

    callback(null, { title });
  });
};
