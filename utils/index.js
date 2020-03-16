const child_process = require("child_process");
const open = require("open");
const utils = {
  openBrowse: url => {
    if (!url) return;
    if (process.platform === "wind32") {
      cmd = "start";
    } else if (process.platform === "linux") {
      cmd = "xdg-open";
    } else if (process.platform === "darwin") {
      cmd = "open";
    }
    open(`${url}`);
  }
};

module.exports = utils;
