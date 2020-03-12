const db = require("/opt/nodejs/dynamodbHelper");

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function constructItem(payload) {
  let id = payload.id || uuid();
  let timestamp = payload.timestamp || new Date().toISOString();

  return {
    id: id,
    userId: 1,
    timestamp: timestamp,
    title: payload.title,
    body: payload.body,
    type: payload.type || "note",
    generateTitle: payload.generateTitle || false
  };
}

exports.handler = (event, context, callback) => {
  // if (event.generateTitle) {
  //   var originalUrl = event.body;
  //   var titleBody = righto(tiny.get, { url: event.body });

  //   event.title = titleBody.get(webPage => {
  //     let parsed = util.matchTitle(webPage.body);
  //     return !parsed ? originalUrl : unescape(parsed);
  //   });
  // }

  let item = constructItem(JSON.parse(event.body));

  db.put(item, err => {
    if (err) return callback(err);

    var response = {
      isBase64Encoded: false,
      statusCode: 200,
      headers: {},
      body: "ok"
    };

    callback(null, response);
  });
};
