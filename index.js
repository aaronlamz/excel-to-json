const fs = require("fs");
const path = require("path");
const http = require("http");
const utils = require("./utils");
const XLSX = require("xlsx");

function run(options) {
  const workbook = XLSX.readFile("./list.xlsx");
  const defaultMode = "i18n";
  const sheet_name_list = workbook.SheetNames;
  const workbookH5 = workbook.Sheets[sheet_name_list[0]];

  let mode = options.mode || pdefaultMode;
  const mode_i18n = {
    i18n: {
      zhCHT: {},
      zhCHS: {},
      en: {}
    }
  };
  const mode_array = [];

  let columnKeyZhCHT = "A"; // 默认繁体列表序号
  let columnKeyEn = "B"; // 默认繁体列表序号
  let columnKeyZhCHS = "C"; // 默认繁体列表序号
  let columnCustomKey = "D"; // 自定义Key列表序号
  let beginRowNum = +options.beginRowNum || 1; // 默认开始行号
  let endRowNum = +options.endRowNum || 10; // 默认结束行

  let workbookMap = {};
  Object.keys(workbookH5).forEach(key => {
    if (key.indexOf("!") === -1) {
      let rowNum = key.match(/\d+/) ? key.match(/\d+/)[0] : 0;
      if (rowNum < beginRowNum || rowNum > endRowNum) return;
      if (!workbookMap[rowNum]) {
        workbookMap[rowNum] = {};
        workbookMap[rowNum][key] = workbookH5[key].v;
      } else {
        workbookMap[rowNum][key] = workbookH5[key].v;
      }
    }
  });
  Object.keys(workbookMap).forEach(rowNum => {
    let customKey = workbookMap[rowNum][`${columnCustomKey}${rowNum}`]; // 自定义KEY
    let zhCHSKey = customKey || `${columnKeyZhCHS}${rowNum}`;
    let zhCHTKey = customKey || `${columnKeyZhCHT}${rowNum}`;
    let enKey = customKey || `${columnKeyEn}${rowNum}`;
    mode_i18n.i18n.zhCHS[zhCHSKey] = workbookMap[rowNum][zhCHSKey];
    mode_i18n.i18n.zhCHT[zhCHTKey] = workbookMap[rowNum][zhCHTKey];
    mode_i18n.i18n.en[enKey] = workbookMap[rowNum][enKey];
    mode_array.push([
      `${workbookMap[rowNum][zhCHSKey]}`,
      `${workbookMap[rowNum][zhCHTKey]}`,
      `${workbookMap[rowNum][enKey]}`
    ]);
  });

  let result = null;
  if (mode === "i18n") {
    result = mode_i18n;
  } else {
    result = mode_array;
  }
  console.log(result);

  const port = 8881;
  http
    .createServer((req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(JSON.stringify(result, null, " "));
    })
    .listen(port);
  console.log(`Server running at http://localhost:${port}/`);
  utils.openBrowse(`http://localhost:${port}/`);
}
module.exports = run;
