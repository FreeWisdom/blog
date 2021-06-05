/**
 * @description 常用文件夹路径
 * @author zhz
 */

const path = require('path')

const srcPath = path.join(__dirname, '..', 'src')
const distPath = path.join(__dirname, '..', 'dist')

console.log(__dirname)
console.log(srcPath)

module.exports = {
    srcPath,
    distPath
}
