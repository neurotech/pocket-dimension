// Adapted from https://stackoverflow.com/a/45899308
let EPOCH = 1300000000000;

module.exports = {
  generate: function() {
    let ts = new Date().getTime() - EPOCH;
    let randid = Math.floor(Math.random() * 512);
    ts = ts * 64;
    ts = ts + 1;
    return ts * 512 + (randid % 512);
  }
};
