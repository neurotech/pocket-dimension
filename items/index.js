if (process.env.NODE_ENV === "development") require("dotenv").config();

const db = require("../db");
const query = require("../query");
const log = require("../log");

function createItem(request, response, tokens) {}

function getItems(request, response, tokens) {
  db.connect();
  db.query("SELECT NOW()", (err, res) => {
    if (err) console.error(err);
    console.log(res.rows);
    db.end();
  });
}

function updateItem(request, response, tokens) {}

function deleteItems(request, response, tokens) {}

module.exports = {
  create: createItem,
  get: getItems,
  update: "",
  delete: ""
};
