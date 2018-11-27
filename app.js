if (process.env.NODE_ENV === "development") require("dotenv").config();
const web = require("./web");

// Start the web server
web.start();
