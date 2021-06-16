const koa = require('koa');
const fs = require('fs');
const mount = require('koa-mount');     // 路由中间件
const static = require('koa-static');   // 最初所有的资源文件都放到了 locallhost:9000 ，使用 static 将资源文件可以正确的进行匹配；

const app = new koa();

app.use(
    static(__dirname + '/source/')
)

app.use(
    mount('/', async (ctx) => {
        ctx.body = fs.readFileSync(__dirname + '/source/index.html', 'utf-8');
    })
)

module.exports = app;