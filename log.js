const symbols = require("log-symbols");

let log = (message, symbol) => {
  let logMessage = `${symbol} ${message}`;

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
