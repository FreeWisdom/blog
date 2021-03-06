#!/usr/bin/env node

/**
 * #########################################  原生
 */
// const lib = require("zhzlib-test");
// console.log(lib.sum(555, 111));
// console.log("hy zhzcli-test!!!");

// // ①引入本地库文件中，以便使用其中的init方法；
// const lib = require("zhzlib-test");

// // ②注册一个命令 zhzcli-test init
// const argv = require('process').argv;       // 拿到命令行的所有参数[ '/usr/local/bin/node', '/usr/local/bin/zhzcli-test', 'init' ]
// const command = argv[2];                    // 拿到命令行的第三个参数 init；

// // ③实现参数解析 init --name
// const options = argv.slice(3);
// if (options.length > 1) {
//     let [option, param] = options;
//     option = option.replace("--", "");

//     if (command) {
//         if (lib[command]) {
//             lib[command](option, param);
//         } else {
//             console.log("无效的命令！");
//         }
//     } else {
//         console.log("请输入命令！");
//     }
// }

// // ④实现参数解析 --version
// if(command.startsWith("--") || command.startsWith("-")) {
//     const globalOption = command.replace(/--|-/g, "");
//     if(globalOption === "version" || globalOption === "V") {
//         console.log("1.0.0");
//     }
// }

/**
 * #########################################  yargs
 */
const yargs = require("yargs/yargs");
// const { hideBin } = require("yargs/helpers");
const { boolean } = require("yargs");
const pkg = require("../package.json");

// const arg = hideBin(process.argv);
// const cli = yargs(arg);

const cli = yargs();

const context = {
    zhzcliVersion: pkg.version,
};

const argv = process.argv.slice(2);

cli
    .usage('Usage: zhzcli-test [command] <options>')
    .demandCommand(1, "A command is required. Pass --help to see all available commands and options.")  // 最少一个参数
    .recommendCommands()    // 提示
    .alias("h", "help")
    .alias("v", "version")
    .fail((err, msg) => {
        console.log(err);
        console.log(msg);
    })
    .wrap(cli.terminalWidth())
    .epilogue("页脚自定义")
    .strict()
    .options({
        debug: {
            type: boolean,
            describe: "启动debug",
            alias: "d"
        }
    })
    .option("ci", {
        hidden: false,
        type: "boolean",
        describe: "启动ci"
    })
    .group(["debug"], "Dev Options:")
    .command("init [name]", "init a project.", (yargs) => {
        yargs
            .option("name", {
                type: "string",
                describe: "name of project"
            })
    }, (argv) => {
        console.log(argv);
    })
    .command({
        command: "list",
        aliases: ["ls", "la", "ll"],
        describe: "list local package",
        builder: (yargs) => { },
        handler: (argv) => {
            console.log(argv);
        }
    })
    .parse(argv, context);  // 往argv中注入参数不需要手动做太多逻辑；
    // .argv;