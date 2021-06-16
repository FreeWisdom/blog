const app = new (require('koa'));
const mount = require('koa-mount');
const static = require('koa-static');
const getData = require('./get-data')

// react 同构所需的 'react-dom/server' & 'babel-register'
const ReactDOMServer = require('react-dom/server');
require('babel-register')({
    presets: ['react']
});

const App = require('./app.jsx')

// 此处是 es6 模版引擎，因为 react 模版只提供组件级别的渲染，为了对整个页面的渲染，需要模版引擎配合 react 完成；
const template = require('./template')(__dirname + '/index.htm')

app.use(mount('/static', static(__dirname + '/source')))

// 前端点击筛选过滤后，过滤数据的请求到达此处，完成前端页面无刷新渲染；
app.use(mount('/data', async (ctx) => {
    ctx.body = await getData(+(ctx.query.sort || 0), +(ctx.query.filt || 0));
}));

// 完成首次服务端渲染
app.use(async (ctx) => {
    ctx.status = 200;
    const filtType = +(ctx.query.filt || 0);                    // 从 url 得到取数据的参数
    const sortType = +(ctx.query.sort || 0);                    // 从 url 得到取数据的参数
    const reactData = await getData(sortType, filtType);        // 获取当前页面的数据

    ctx.body = template({                                       // 将 react 组件转换成的 string & 数据 & filtType & sortType 组合，生成模版，返回给浏览器
        reactString: ReactDOMServer.renderToString(             // reactString 将 react 组件转换成 string
            App(reactData)                                      // 将数据传入 react 组件，使 react 组件完整
        ),
        reactData,
        filtType,
        sortType
    })
})

// app.listen(3000)

module.exports = app;