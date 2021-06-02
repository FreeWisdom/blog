# 1、Node.js 全局变量

* 与浏览器相似的全局变量

```js
console.log(Date);												// [Function: Date]
console.log(Math);												// Object [Math] {}
console.log(setTimeout);									// [Function: setTimeout]
console.log(setInterval);									// [Function: setInterval]

/*浏览器渲染的下一帧 requestAnimationFrame 在服务端环境中是不存在的，用 setImmediate 代替；*/
console.log(requestAnimationFrame);				// ReferenceError: requestAnimationFrame is not defined
console.log(setImmediate);								// [Function: setImmediate] {}
```

* Node.js特有的全局变量

```js
// 当前代码所运行的脚本位置
console.log(__filename);										// D:\MyCode\Gitee\Learning.Node\geek-nodejs\08\index.js

// 当前代码所运行的脚本目录
console.log(__dirname);											// D:\MyCode\Gitee\Learning.Node\geek-nodejs\08

console.log(process);
/* 
process {
  version: 'v14.16.0',									 		// Node.js 版本号
  arch: 'x64',															// 运行环境的操作系统
  platform: 'darwin',												// 运行环境的操作系统
  binding: [Function: binding],
 	......
  hrtime: [Function: hrtime] { bigint: [Function: hrtimeBigInt] },		// 用于统计时间，可以精确到微秒级
  cpuUsage: [Function: cpuUsage],																			// CPU占有率
  memoryUsage: [Function: memoryUsage],																// 内存占用率
  kill: [Function: kill],																							// 用于管理，或者杀进程的操作
  exit: [Function: exit],																							// 用于管理，或者杀进程的操作
  env: {																		// Node的环境变量，作用:可以设置环境变量，以便在不同的开发中使用
    ......
    PATH: '/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Users/Thales/.yarn/bin:/Users/Thales/.config/yarn/global/node_modules/.bin',
	  .....
  },
  argv: [ '/usr/local/bin/node', '/Users/Thales/Desktop/node.js/index' ],		// 用户在启动程序时，敲击的命令是怎样的， 作用:命令行程序中使用}
*/
```