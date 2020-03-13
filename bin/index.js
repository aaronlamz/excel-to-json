#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const program = require("commander");

program
    .version('1.0.0')
    .usage('<keywords>')
    .parse(process.argv);

if(!program.args.length) {
    program.help();
} else {
    console.log('Keywords: ' + program.args);   
}