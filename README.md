<p align="center">
    <img src="https://github.com/Aaronlamz/excel-to-json/blob/dev/logo.png" alt="logo" width="200"  />
</p>

[![build](https://github.com/Aaronlamz/excel-to-json/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/Aaronlamz/excel-to-json/actions/workflows/npm-publish.yml)

## ⚡ Why need this?
i18n messages is stored in Excel file, but it is not easy to edit in your code. So, this tool is created to convert Excel to JSON. 

## 📜 Features
Excel data structure is converted to JSON.
The key of the first column of the first row is required.

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

## 🌈 Installation

Using npm:

```sh
$ npm install -g excel-to-json-parser
```

Using yarn:

```sh
$ yarn global add excel-to-json-parser
```

## 🔥 Usage
run etj --help without arguments to see list of options:
```sh
Usage: etj --sourceFile <dir>

Options:
  -V, --version           output the version number
  -s, --sourceFile <dir>  source file path need to be converted
  -h, --help              display help for command
```

use CLI
```sh
etj --sourceFile /yourdir/example.xlsx
// or
etj -s /yourDir/example.xlsx
```

## 🔧 Examples
run example
```sh
yarn example
```

## ©️ License

[MIT](https://en.wikipedia.org/wiki/MIT_License)








