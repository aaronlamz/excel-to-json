<p align="center">
    <img src="https://github.com/Aaronlamz/excel-to-json/blob/dev/logo.png" alt="logo" width="200"  />
</p>

[![build](https://github.com/Aaronlamz/excel-to-json/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/Aaronlamz/excel-to-json/actions/workflows/npm-publish.yml)

## Why need this?
i18n messages is stored in Excel file, but it is not easy to edit in your code. So, this tool is created to convert Excel to JSON. 
## Features

Excel data structure is converted to JSON.
| Key | zh_CN | zh_HK | en | and more languages...
|:---|:---|:---|:---|:---|
| hello | 你好 | 你好 | hello | ... |
| world | 世界 | 世界 | world! | ... |

output JSON:

```json
{
   "zh_CN": {
        "hello": "你好",
        "world": "世界",
    },
    "zh_HK": {
        "hello": "你好",
         "world": "世界",
    },
    "en": {
        "hello": "hello",
         "world": "world!",
    }
}
```

## Installation

Using npm:

```sh
$ npm install -g excel-to-json-parser
```

Using yarn:

```sh
$ yarn global add excel-to-json-parser
```

## Usage

```sh
etj --sourceFile /yourdir/example.xlsx
// or
etj -s /yourDir/example.xlsx
```
## Examples

```sh
yarn example
```
<!-- ![example](./examples/example.png) -->

## Todo
* Add UI for configuring the output file options
* 无法解析在线文档导出的xlsx文件

## License

[MIT](https://en.wikipedia.org/wiki/MIT_License)

