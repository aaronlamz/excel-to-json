#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const program = require("commander");
const inquirer = require("inquirer");
const http = require("http");
const run = require("../index.js");

let beginRowNum = 1; // 默认开始行号
let endRowNum = 10; // 默认结束行

program.version("1.0.6").usage("<run>");
program.arguments("<run>").action(function(cmd) {
  var questions = [
    {
      type: "list",
      name: "mode",
      message: "请选择输出的数据格式",
      choices: ["i18n", "array"]
    },
    {
      type: "input",
      name: "beginRowNum",
      message: "请确保当前目录是否有excel文件，请输入开始的行号(默认为1):"
    },
    {
      type: "input",
      name: "endRowNum",
      message: "请输入结束的行号(默认为10):"
    }
  ];
  if (cmd === "run") {
    inquirer.prompt(questions).then(options => {
      run(options);
    });
  } else {
    console.error("请输入正确的参数!");
    program.help();
  }
});

program.parse(process.argv);
if (!program.args.length) {
  program.help();
}
