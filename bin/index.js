#!/usr/bin/env node
const path = require('path')
const XLSX = require('xlsx')
const fs = require('fs')
const program = require('commander')
const inquirer = require('inquirer')
const run = require('../index.js')
const config = require('../package.json')
const workbook = XLSX.readFile('./list.xlsx')
const sheet_name_list = workbook.SheetNames

program.version(config.version).usage('<run>')
program.arguments('<run>').action(function (cmd) {
    var questions = [
        {
            type: 'list',
            name: 'mode',
            message: '请选择输出的数据格式',
            choices: ['i18n', 'array']
        },
        {
            type: 'list',
            name: 'column',
            message: '请选择哪一个表格',
            choices: sheet_name_list
        },
        {
            type: 'input',
            name: 'beginRowNum',
            message: '请确保当前目录是否有excel文件，请输入开始的行号(默认为1):'
        },
        {
            type: 'input',
            name: 'endRowNum',
            message: '请输入结束的行号(默认为10):'
        },
        {
            type: 'input',
            name: 'columnKeyZhCHT',
            message: '请输入Excel表格繁体列序号(默认为A):'
        },
        {
            type: 'input',
            name: 'columnKeyEn',
            message: '请输入Excel表格英文列的序号(默认为B):'
        },
        {
            type: 'input',
            name: 'columnKeyZhCHS',
            message: '请输入Excel表格简体列的序号(默认为C):'
        },
        {
            type: 'input',
            name: 'columnCustomKey',
            message: '请输入Excel表格自定义KEY的序号(默认为D):'
        }
    ]
    if (cmd === 'run') {
        inquirer.prompt(questions).then(options => {
            console.log(sheet_name_list)
            options.column = sheet_name_list.findIndex(element => {
                return element === options.column
            })
            run(options)
        })
    } else {
        console.error('请输入正确的参数!')
        program.help()
    }
})

program.parse(process.argv)
if (!program.args.length) {
    program.help()
}
