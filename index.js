const fs = require("fs");
const path = require("path");
const http = require("http");
const child_process = require("child_process");
const XLSX = require("xlsx");

const workbook = XLSX.readFile("./example/list.xlsx");
const defaultMode = "i18n";
const sheet_name_list = workbook.SheetNames;
const workbookH5 = workbook.Sheets[sheet_name_list[0]];

const openBrowse = url => {
  if (!url) return;
  if (process.platform === "wind32") {
    cmd = "start";
  } else if (process.platform === "linux") {
    cmd = "xdg-open";
  } else if (process.platform === "darwin") {
    cmd = "open";
  }
  child_process.exec(`${cmd} ${url}`);
};

let mode = defaultMode
const mode_i18n = {
  i18n: {
    zhCHT: {},
    zhCHS: {},
    en: {}
  }
};

let columnKeyZhCHT = "A"; // 默认繁体列表序号
let columnKeyEn = "B"; // 默认繁体列表序号
let columnKeyZhCHS = "C"; // 默认繁体列表序号
let columnKey = "D"; // 自定义Key列表序号
let beginRowNum = 1; // 默认开始行号
let endRowNum = 10; // 默认结束行号

console.log(workbookH5);
if (mode === "i18n") {
  Object.keys(workbookH5).forEach(key => {
    if (key.indexOf("!") === -1) {
      let rowNum = key.match(/\d+/) ? key.match(/\d+/)[0] : 0;
      if (rowNum < beginRowNum || rowNum > endRowNum) return;
      if (key.includes(columnKeyZhCHT)) {
        mode_i18n.i18n.zhCHT[`key_${rowNum}`] = workbookH5[key].v;
      }
      if (key.includes(columnKeyEn)) {
        mode_i18n.i18n.en[`key_${rowNum}`] = workbookH5[key].v;
      }
      if (key.includes(columnKeyZhCHS)) {
        mode_i18n.i18n.zhCHS[`key_${rowNum}`] = workbookH5[key].v;
      }
    }
  });
  console.log(mode_i18n);
}

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
    res.end(JSON.stringify(mode_i18n, null, " "));
  })
  .listen(8888);
console.log("Server running at http://localhost:8888/");
openBrowse("http://localhost:8888/");
