#!/usr/bin/env node
const path = require('path')
const XLSX = require('xlsx')
const nodeXlsx = require('node-xlsx')
const { readFileSync } = require('fs')
const { Command } = require('commander')
const program = new Command()
const inquirer = require('inquirer')
const run = require('../src/index.js')
const { version } = require('../package.json')

const go = arguments => {
    const workbook = nodeXlsx.parse(arguments.sourceFile)
    console.log(workbook)
    return
    const sheetNames = workbook.SheetNames

    const questions = [
        {
            type: 'list',
            name: 'sheetName',
            message: 'Please select the sheet you want to convert',
            choices: sheetNames
        },
        {
            type: 'input',
            name: 'clunmKey',
            message:
                'Please input the column key as the key of the language (default: D)'
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
        console.log(workbook)
        console.log(workbook.sheets)
    })
}

program
    .version(version, '-V, --version')
    .usage('[options]')
    .option('-s, --sourceFile <dir>', 'source file path need to be converted')
    .action(options => {
        if (options.sourceFile) {
            go(options)
        }
    })

program.parse()

// if (!program.args.length) {
//     program.help()
// }
