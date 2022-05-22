#!/usr/bin/env node
const path = require('path')
const nodeXlsx = require('node-xlsx')
const { readFileSync } = require('fs')
const { Command } = require('commander')
const program = new Command()
const inquirer = require('inquirer')
const open = require('../src/index.js')
const { version } = require('../package.json')

const go = arguments => {
    const workbook = nodeXlsx.parse(arguments.sourceFile)
    const sheetNames = workbook.map(item => item.name)
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
                'Please input the column key as the key of the language (default: zhCHS)'
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
        const sheet = workbook.find(item => item.name === options.sheetName)
        packageData(sheet, options)
    })
}

const packageData = (sheet, options) => {
    if (sheet.data.length === 0) {
        console.log('sheet is empty')
        return
    }

    const sheetDataList = sheet.data
    const firstRow = sheetDataList[0]
    const languages = firstRow.slice(1)
    const defaultKey = 'key'
    const columnKey = options.clunmKey || 'zhCHS'
    const defaultKeyIndex = firstRow.findIndex(item => item === defaultKey)
    const columnKeyIndex = firstRow.findIndex(item => item === columnKey)

    console.log('firstRow', firstRow)
    console.log('columnKeyIndex', columnKeyIndex)
    console.log('key is ', firstRow[columnKeyIndex])

    const beginRowNum = options.beginRowNum || 1
    const endRowNum = options.endRowNum || sheetDataList.length
    const jsonData = {}

    for (let i = beginRowNum; i <= endRowNum; i++) {
        const row = sheetDataList[i]
        languages.forEach((language, index) => {
            if (/^[a-z_A-Z]+$/g.test(language) && row && row.length) {
                const languageIndex = index + 1
                const key = row[defaultKeyIndex] || row[columnKeyIndex]
                const value = row[languageIndex]
                if (!jsonData[language]) {
                    jsonData[language] = {}
                }
                if (key) {
                    jsonData[language][key] = value
                }
            }
        })
    }
    console.log(jsonData)
    open(jsonData)
}

program
    .version(version, '-V, --version')
    .usage('[options]')
    .option('-s, --sourceFile <dir>', 'source file path need to be converted')
    .action(options => {
        if (options.sourceFile) {
            go(options)
        } else {
            console.log('Please input the source file path')
        }
    })

program.parse()
