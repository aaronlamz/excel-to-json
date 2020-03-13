const fs = require("fs");
const path = require("path");
const http = require("http");
const child_process = require("child_process");
const XLSX = require("xlsx");

const workbook = XLSX.readFile("./files/list.xlsx");
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

let columnKeyZhCHT = "A";
let columnKeyEn = "B";
let columnKeyZhCHS = "C";
let columnKey = "D";
let beginRowNum = 111;
let endRowNum = 130;

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

  // fs.writeFile(
  //   "output_xlsx.js",
  //   JSON.stringify(mode_i18n, null, " "),
  //   "utf8",
  //   function(error) {
  //     if (error) {
  //       console.log(error);
  //       return false;
  //     }
  //     console.log("写入成功");
  //   }
  // );
}
http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
    res.end(JSON.stringify(mode_i18n, null, " "));
  })
  .listen(8888);
console.log("Server running at http://localhost:8888/");
openBrowse("http://localhost:8888/");
