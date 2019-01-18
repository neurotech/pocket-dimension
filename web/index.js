const http = require("http");
const SeaLion = require("sea-lion");
const Dion = require("dion");
const seaLion = new SeaLion();
const dion = new Dion(seaLion);
const items = require("../items");
const getPageInfo = require("../get-page-info");
const auth = require("../auth");
const log = require("../log");

let port = 4567;
let mimeTypes = {
  ".css": "text/css",
  ".js": "application/javascript",
  ".map": "application/octet-stream",
  ".svg": "image/svg+xml",
  ".gif": "image/gif",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon"
};

seaLion.add({
  "/": {
    GET: dion.serveFile("./build/index.html", "text/html")
  },
  "/`path...`": {
    GET: dion.serveDirectory("./build", mimeTypes)
  },
  "/api/item/`id`": {
    GET: items.get
  },
  "/api/items/all": {
    GET: items.get
  },
  "/api/items/latest": {
    GET: items.get
  },
  "/api/items/create": {
    POST: items.create
  },
  "/api/item/update/`params`": {
    PUT: items.update
  },
  "/api/items/delete/`params`": {
    DELETE: items.delete
  },
  "/api/get-page-info": {
    POST: getPageInfo
  },
  "/api/login": {
    POST: auth.login
  }
});

let server = http.createServer(seaLion.createHandler());

module.exports = {
  start: () => {
    server.listen(port);
    log.info(`Started web server on port ${port}.`);
  }
};
