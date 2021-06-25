# webpack 原理与实战

# 1、JS 中的模块化

ES6之前主流的模块化规范有 CommonJS、AMD。

## 1.1、CommonJS & AMD & ESMoudel 差异

1. ### CommonJS

   * **【缺点】**是Node.js推出***同步***的模块化规范，只能运行在node环境；
   * CommonJS 中，每个 js 文件就是一个模块；
   * ♨️一个模块中使用 `moudel.exports` 对象对模块导出；
   * ♨️另一个模块使用 `require` 函数导入；
   * ♨️CommonJS 规范内，每个模块都是单例的；
     * 即：一个模块一旦加载完成后，无论之后再加载多少次，模块的内容都是相同的；

2. ### AMD（Asynchronous model definition）

   1. 是 WEB 端实现***异步***的适合浏览器端的模块化规范；

   2. **【缺点】**若使用该规范，必须引入 `require` 加载器；

   3. 它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。

   4. 使用 `define` 函数进行 module 定义；

      * 如果一个模块不依赖其他模块，那么可以直接定义在define()函数之中。

      * 如果这个模块还依赖其他模块，那么define()函数的第一个参数，必须是一个数组，指明该模块的依赖性。

      ```js
      // math.js
      define(['myLib'], function (){
        var add = function (x,y){
          return x+y;
        };
        return {
          add: add
        };
      });
      ```

   5. 另一个模块使用 `require` 函数导入；

      ```js
      // main.js
      require(['math'], function (math){
        alert(math.add(1,1));
      });
      ```

3. ### ESMoudel

   1. 也是单例的；

   2. 是语言层面的；可以更好的兼容 node/浏览器/小程序（升级引擎就可以使用 ESMoudel ）

   3. 【优点】用来解决上述模块化规范的缺点：

      * 需要运行环境；

      * 需要依赖库；

   4. 并解决了各个模块相互之间不能共用的缺点；

   5. `export` 导出；

   6. `import` 导入；

   7. 【缺点】

      * 必须先使用 babel 编译成 commonJS 规范；
        * 编译后还是无法直接运行在浏览器；
      * 再进行打包，打包工具将模块化内部实现细节抹平，能直接运行在 WEB 或 Node.js；

4. ### CMD 

   * 玉伯搞的，小众，可以被 AMD 包容，没必要了解；

## 1.2、模块化的编译与打包

* ### nodeJS 处理 commonJS 模块原理

  1. 将读取的文件转换成字符串；
  2. 将字符串包裹在一个 `function(require, module, exports) { //string }` 函数中，函数的作用是注入 commonJS 的方法 require, module, exports；
  3. 使用 `vm.runInNewContext` 将一个字符串编译成一个可执行函数；

# 2、webpack 的打包原理

## 2.1、处理 commonjs 规范----module

> 模板文件

```js
// index.bundle.boilerplate

(function() {
  var moduleList = [
    function(require, module, export) {
      /* template */
    }
  ];
  
  var module = {export: {}};
  moduleList[0](null, module);
})()
```

> 打包文件

```js
// bundle.js
const path = require('path');
const fs = require("fs");

// 引入模版
const boiler = fs.readFileSync(
  path.resolve(__dirname, 'index.bundle.boilerplate'),
  'utf-8'
);

// 引入要打包的文件
const target = fs.readFileSync(
  path.resolve(__dirname, '../', 'index.js'),
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
```

## 2.2、处理 commonjs 规范----require

* webpack 会将每个模块进行编译，编译时分别为每个模块建立 ID ；
* 在使用 require 的时候，require 会对相应的依赖的 ID 进行引用；



# 3、总结

## 3.1 打包的主要流程如下

1. 需要读到入口文件里面的内容。
2. 分析入口文件，递归的去读取模块所依赖的文件内容，生成AST语法树。
3. 根据AST语法树，生成浏览器能够运行的代码

## 3.2 具体细节

1. 获取模块内容 `getModuleInfo(file) ` ，并返回对象 `{模块路径:"", 模块依赖:{}, es5代码:""}` ：

   1. 读取模块：`fs.readFileSync(file,'utf-8')` ；
   2. 分析模块：安装 `@babel/parser` 包（将获取到的模块内容解析成AST语法树转AST）;
   3. 收集依赖：安装 `@babel/traverse` 包（遍历AST收集当前传入文件的依赖）;
   4. ES6转ES5：安装 `@babel/core` 和 `@babel/preset-env` 包（es6的ast 转为 ES5的ast）；
   5. 返回对象：对象包括（该模块的路径file）（该模块的依赖deps）（该模块转化成es5的代码）；

2. 遍历所有模块，递归获取依赖文件的依赖，并返回对象如下：

   ```json
   {
     'src/index.js': {
       deps: {'./add.js': 'src/\\add.js', './minum.js': './src\\minum.js'},
       code: 'xxx'
     },
     './src\\add.js': {
       deps: {},
       code: 'xxx'
     },
     './src\\minum.js': {
       deps: {},
       code: 'xxx'
     }
   }
   ```

3. 处理 CommonJS 规范关键字 ` require` & `exports` ，并打包成一个文件；

   * 由于 babel 将代码转成 CommonJS 规范，而浏览器不会识别执行 require 和 exports ，故需要做关键字处理；

4. 生成最终代码，写入打包目录；



> bundle.js 源码

```js
const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')
const getModuleInfo = (file)=>{
    const body = fs.readFileSync(file,'utf-8')
    const ast = parser.parse(body,{
        sourceType:'module' //表示我们要解析的是ES模块
    });
    const deps = {}
    traverse(ast,{
        ImportDeclaration({node}){
            const dirname = path.dirname(file)
            const abspath = "./" + path.join(dirname,node.source.value)
            deps[node.source.value] = abspath
        }
    })
    const {code} = babel.transformFromAst(ast,null,{
        presets:["@babel/preset-env"]
    })
    const moduleInfo = {file,deps,code}
    return moduleInfo
}
const parseModules = (file) =>{
    const entry =  getModuleInfo(file)
    const temp = [entry]
    const depsGraph = {}
    for (let i = 0;i<temp.length;i++){
        const deps = temp[i].deps
        if (deps){
            for (const key in deps){
                if (deps.hasOwnProperty(key)){
                    temp.push(getModuleInfo(deps[key]))
                }
            }
        }
    }
    temp.forEach(moduleInfo=>{
        depsGraph[moduleInfo.file] = {
            deps:moduleInfo.deps,
            code:moduleInfo.code
        }
    })
    return depsGraph
}
const bundle = (file) =>{
    const depsGraph = JSON.stringify(parseModules(file))
    return `(function (graph) {
        function require(file) {
            function absRequire(relPath) {
                return require(graph[file].deps[relPath])
            }
            var exports = {};
            (function (require,exports,code) {
                eval(code)
            })(absRequire,exports,graph[file].code)
            return exports
        }
        require('${file}')
    })(${depsGraph})`

}
const content = bundle('./src/index.js')

console.log(content);

//写入到我们的dist目录下
fs.mkdirSync('./dist');
fs.writeFileSync('./dist/bundle.js',content)
```

## 3.3、webpack的构建流程是什么?从读取配置到输出文件这个过程尽量说全
Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

1. 初始化参数：从配置文件和 Shell 语句中读取并合并参数，得出最终的参数；
2. 初始化Compiler：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
3. 确定入口：根据配置中的 entry 找出所有的入口文件；
4. 递归编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
5. 递归获取依赖：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
6. 合并module为chunk：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
7. Chunk 输出为 Bundle：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

## 3.4、webpack的热更新是如何做到的？说明其原理？

1. watch 示例中体现的，对本地源代码文件内容变更的监控。
2. instant reload 示例中体现的，浏览器网页端与本地服务器端的 Websocket 通信。

1. hmr 示例中体现的，也即是最核心的，模块解析与替换功能。

webpack的热更新又称热替换（Hot Module Replacement），缩写为HMR。 这个机制可以做到不用刷新浏览器而将新变更的模块替换掉旧的模块。

<img class="picture" src="https://cdn.nlark.com/yuque/0/2021/jpeg/114317/1624461072423-assets/web-upload/a6d7e2f9-26c6-48af-b9ed-88591c79f09d.jpeg" alt="" style="width: 805px; height: 837px;">

* 首先要知道server端和client端都做了处理工作  

1. 第一步，在 webpack 的 watch 模式下，文件系统中某一个文件发生修改，webpack 监听到文件变化，根据配置文件对模块重新编译打包，并将打包后的代码通过简单的 JavaScript 对象保存在内存中。  
2. 第二步是 webpack-dev-server 和 webpack 之间的接口交互，而在这一步，主要是 dev-server 的中间件 webpack-dev-middleware 和 webpack 之间的交互，webpack-dev-middleware 调用 webpack 暴露的 API对代码变化进行监控，并且告诉 webpack，将代码打包到内存中。  
3. 第三步是 webpack-dev-server 对文件变化的一个监控，这一步不同于第一步，并不是监控代码变化重新打包。当我们在配置文件中配置了devServer.watchContentBase 为 true 的时候，Server 会监听这些配置文件夹中静态文件的变化，变化后会通知浏览器端对应用进行 live reload。注意，这儿是浏览器刷新，和 HMR 是两个概念。  
4. 第四步也是 webpack-dev-server 代码的工作，该步骤主要是通过 sockjs（webpack-dev-server 的依赖）在浏览器端和服务端之间建立一个 websocket 长连接，将 webpack 编译打包的各个阶段的状态信息告知浏览器端，同时也包括第三步中 Server 监听静态文件变化的信息。浏览器端根据这些 socket 消息进行不同的操作。当然服务端传递的最主要信息还是新模块的 hash 值，后面的步骤根据这一 hash 值来进行模块热替换。  
5. webpack-dev-server/client 端并不能够请求更新的代码，也不会执行热更模块操作，而把这些工作又交回给了 webpack，webpack/hot/dev-server 的工作就是根据 webpack-dev-server/client 传给它的信息以及 dev-server 的配置决定是刷新浏览器呢还是进行模块热更新。当然如果仅仅是刷新浏览器，也就没有后面那些步骤了。  
6. HotModuleReplacement.runtime 是客户端 HMR 的中枢，它接收到上一步传递给他的新模块的 hash 值，它通过 JsonpMainTemplate.runtime 向 server 端发送 Ajax 请求，服务端返回一个 json，该 json 包含了所有要更新的模块的 hash 值，获取到更新列表后，该模块再次通过 jsonp 请求，获取到最新的模块代码。这就是上图中 7、8、9 步骤。  
7. 而第 10 步是决定 HMR 成功与否的关键步骤，在该步骤中，HotModulePlugin 将会对新旧模块进行对比，决定是否更新模块，在决定更新模块后，检查模块之间的依赖关系，更新模块的同时更新模块间的依赖引用。  
8. 最后一步，当 HMR 失败后，回退到 live reload 操作，也就是进行浏览器刷新来获取最新打包代码。

