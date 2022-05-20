#!/usr/bin/env node
const path = require('path')
const XLSX = require('xlsx')
const fs = require('fs')
const { Command } = require('commander')
const program = new Command()
const inquirer = require('inquirer')
const run = require('../src/index.js')
const { version } = require('../package.json')

program
    .version(version, '-V, --version')
    .usage('[options]')
    .option('-s, --sourceFile <dir>', 'source file path need to be converted')
    .action(options => {
        if (options.sourceFile) {
            const workbook = XLSX.readFile(options.sourceFile)
            const sheetNames = workbook.SheetNames
            console.log(workbook)
            const questions = [
                {
                    type: 'list',
                    name: 'sheetNames',
                    message: 'Please select the sheet you want to convert',
                    choices: sheetNames
                },
                {
                    type: 'input',
                    name: 'clunmKeyIndex',
                    message:
                        'Please input the column index as the key of the language (default: D)'
                },
                {
                    type: 'input',
                    name: 'beginRowNum',
                    message: 'Please input the begin row number (default: 1)'
                },
                {
                    type: 'input',
                    name: 'endRowNum',
                    message:
                        'Please input the end row number (default: max number of rows with data)'
                }
            ]
            inquirer.prompt(questions).then(options => {
                console.log('options', options)
            })
        }
    })

program.parse()

// if (!program.args.length) {
//     program.help()
// }
