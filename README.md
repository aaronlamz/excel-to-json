# 🌈 excel-to-json

Convert Excel to JSON

## Why need this?
i18n messages is stored in Excel file, but it is not easy to edit. So, this tool is created to convert Excel to JSON. 

## Status

Working in progress.

## Features

```javascript
{
   "zh_CN": {
        "key1": "简体中文",
    },
    "zh_HK": {
        "key1": "繁体中文",
    },
    "en": {
        "key1": "英文",
    }
}
```

## Installation

Using npm:

```sh
$ npm install -g excel-to-json
```

Using yarn:

```sh
$ yarn global add excel-to-json
```

## Usage

```sh
etj --sourceFile="example.xlsx"
```
## TODO
* Add UI for configuring the output options

## License

[MIT](https://en.wikipedia.org/wiki/MIT_License)
