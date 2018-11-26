const symbols = require("log-symbols");
const spacetime = require("spacetime");

let timestampFormat = "dd-MM-yyyy hh:mm a";

let log = (message, symbol) => {
  let s = spacetime.now();
  let logMessage = `[${s
    .goto("Australia/Sydney")
    .format(timestampFormat)}] ${symbol} ${message}`;

  if (symbol === symbols.error) {
    console.error(logMessage);
  } else {
    console.log(logMessage);
  }
};

module.exports = {
  info: message => {
    log(message, symbols.info);
  },
  success: message => {
    log(message, symbols.success);
  },
  warning: message => {
    log(message, symbols.warning);
  },
  error: message => {
    log(message, symbols.error);
  }
};
