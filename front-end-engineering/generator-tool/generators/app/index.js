const _extend = require("lodash/extend");
const Generator = require("yeoman-generator");
_extend(Generator.prototype, require("yeoman-generator/lib/actions/install"));

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }

    // 为项目创建 package.json
    async initPackage() {
        // 询问后创建项目名称，默认为项目文件夹名称；
        this.answers = await this.prompt(
            {
                type: "input",
                name: "name",
                message: "Your project name",
                default: this.appname// 默认为项目文件夹名称
            }
        );
        const pkgJson = {
            "name": this.answers.name,
            "version": "1.0.0",
            "description": "",
            "main": "generators/app/index.js",
            "scripts": {
                "test": "mocha --require @babel/register",
                "coverage": "nyc mocha --require @babel/register",
                "build": "webpack --config webpack.config.js"
            },
            "author": "",
            "license": "ISC",
            "devDependencies": {
            },
            "dependencies": {
            }
        };

        // Extend or create package.json file in destination path
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    }

    // 为项目安装预备依赖到不同环境；
    install() {
        this.npmInstall([
            "vue",
            "css"
        ], { "save-dev": false });

        this.npmInstall([
            "babel-loader",
            "@babel/core",
            "@babel/preset-env",
            "@babel/register",
            "@istanbuljs/nyc-config-babel",
            "babel-plugin-istanbul",
            "mocha",
            "nyc",
            "webpack",
            "webpack-cli",
            "vue-loader",
            "vue-template-compiler",
            "vue-style-loader",
            "css-loader",
            "copy-webpack-plugin"
        ], { "save-dev": true });
    }

    // 为项目增加模版文件；
    copyFiles() {
        this.fs.copyTpl(
            this.templatePath('HelloWord.vue'),
            this.destinationPath('src/HelloWord.vue'),
            {}
        );
        this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath('webpack.config.js'),
            {}
        );
        this.fs.copyTpl(
            this.templatePath('main.js'),
            this.destinationPath('src/main.js'),
            {}
        );
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('src/index.html'),
            { title: this.answers.name }
        );
        this.fs.copyTpl(
            this.templatePath('.nycrc'),
            this.destinationPath('.nycrc'),
            {}
        );
        this.fs.copyTpl(
            this.templatePath('.babelrc'),
            this.destinationPath('.babelrc'),
            {}
        );
        this.fs.copyTpl(
            this.templatePath('sample.test.js'),
            this.destinationPath('test/sample.test.js'),
            {}
        );
    }
};