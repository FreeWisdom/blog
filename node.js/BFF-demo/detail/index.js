const mount = require('koa-mount');
const static = require('koa-static')
const app = new (require('koa'));
const rpcClient = require('./client');
const template = require('./template');

const detailTemplate = template(__dirname + '/template/index.html');

app.use(mount('/static', static(`${__dirname}/source/static/`)))

app.use(async (ctx) => {
    if (!ctx.query.columnid) {
        ctx.status = 400;
        ctx.body = 'invalid columnid';
        return 
    }

    // 需要在浏览器访问 http://localhost:3000/detail/?columnid=1 ，提供 columnid
    const result = await new Promise((resolve, reject) => {
        rpcClient.write({
            columnid: ctx.query.columnid
        }, function (err, data) {
            err ? reject(err) : resolve(data)
        })
    })

    ctx.status = 200;
    
    // 将返回服务端返回的数据传给模版引擎
    ctx.body = detailTemplate(result);
})

module.exports = app;