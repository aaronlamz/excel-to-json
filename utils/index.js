const child_process = require("child_process");
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
    child_process.exec(`${cmd} ${url}`);
  }
};

module.exports = utils;
