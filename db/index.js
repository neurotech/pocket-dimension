const { Client } = require("pg");

const client = new Client({
  user: process.env.POCKET_PSQL_USERNAME,
  host: process.env.POCKET_PSQL_HOST,
  database: process.env.POCKET_PSQL_DB_NAME,
  password: process.env.POCKET_PSQL_PASSWORD,
  port: 5432
});

module.exports = client;
