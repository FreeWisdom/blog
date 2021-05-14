const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: path.join(__dirname, 'src', 'index.js'),                 // path(当前目录，'src'，'index.js')
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/
            }
        ]
    },
    plugins: [                                                      // 配置插件 plugin 的位置
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),    // 模版位置
            filename: 'index.html'                                  // dist 中生成 html 文件的名字
        })
    ]
}