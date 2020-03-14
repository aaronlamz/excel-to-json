#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const program = require("commander");
const inquirer = require("inquirer");

program.version("1.0.0").usage("<run>");
program.arguments("<run> [env]").action(function(cmd, env) {
  cmdValue = cmd;
  envValue = env;
  var questions = [
    {
      type: "input",
      name: "beginRowNum",
      message: "Please enter the beginRowNum"
    },
    {
      type: "input",
      name: "endRowNum",
      message: "Please enter the endRowNum"
    }
  ];
  inquirer.prompt(questions).then(answers => {
    console.log(JSON.stringify(answers, null, "  "));
  });
});

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
