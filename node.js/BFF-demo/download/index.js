const koa = require('koa');
const fs = require('fs');
const mount = require('koa-mount');     // 路由中间件
const static = require('koa-static');   // 最初所有的资源文件都放到了 locallhost:9000 ，使用 static 将资源文件可以正确的进行匹配；

const app = new koa();

app.use(
    static(__dirname + '/source/')
)

// 【优化1】readFileSync 从 app.use 中间件（http服务阶段）中提出来，到程序启动时做，极大减少了 readFileSync 的计算量占比；
// 【优化2】把 readFileSync 的第二个参数 'utf-8' 删除，直接生成二进制 buffer 给到前端，减少了 '二进制' 与 'utf-8'之间的冗余转换（因为 node 底层 c++ 会用 ‘二进制’ 传给前端）；
const buffer = fs.readFileSync(__dirname + '/source/index.html');
app.use(
    mount('/', async (ctx) => {
        ctx.status = 200;
        ctx.type = 'html';
        ctx.body = buffer
    })
)

module.exports = app;