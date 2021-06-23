// bundle.js
const path = require('path');
const fs = require("fs");

// 引入模版
const boiler = fs.readFileSync(
    path.resolve(__dirname, 'bundle.template'),
    'utf-8'
);

// 引入要打包的文件
const target = fs.readFileSync(
    path.resolve(__dirname, 'index.js'),
    'utf-8'
)

// 将模版与要打包的文件组装；
const content = boiler.replace('/* template */', target);

// 将组装好的文本输出到dist文件夹下的文件中
fs.writeFileSync(
    path.resolve(__dirname, 'dist/index.bundle.js'),
    content,
    'utf-8'
);