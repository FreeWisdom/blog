const path = require('path');
const {
    addLessLoader,
    fixBabelImports,
    addDecoratorsLegacy,
    override,
    addWebpackAlias,
    addWebpackModuleRule
} = require("customize-cra");

function overwriteScssLoader(config) {
    config.module.rules[2].oneOf[5].use.push({
        loader: 'sass-resources-loader',
        options: {
            sourceMap: true,
            resources: ['./src/styles/to-sass/variables.scss']
        }
    })
    return config
}

module.exports = override(
    addDecoratorsLegacy(),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#1DA57A'
        },
        localIdentName: '[local]--[hash:base64:5]' // 自定义 CSS Modules 的 localIdentName
    }),
    addWebpackAlias({
        "@": path.resolve(__dirname, 'src')
    }),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    overwriteScssLoader
    /*     addWebpackModuleRule(
            {
                test: /\.scss$/, use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } },
                    {
                    loader: 'sass-resources-loader',
                    options: {
                        sourceMap: true,
                        resources: ['./src/styles/variables.scss']
                    }
                }]
            }
        ) */
)