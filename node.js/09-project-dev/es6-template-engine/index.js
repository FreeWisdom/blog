const user = {
    name: '<script>alsert("thales")</script>'
}

//----【ejs 模版引擎的使用】------------------------------------------
// const templateA = '<h1><%= user.name %></h1>';
// ejs.render(template, user);


//----【es6模版字符串】+【node/vm模块】实现模版引擎----------------------
// const vm = require('vm');
// const res = vm.runInNewContext(
//     '`<h1>${XSSTranslation(user.name)}</h1>`',
//     { 
//         user,
//         XSSTranslation
//     }
// )
// console.log(res)
function XSSTranslation (str) {
    if(!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}


//----【增加 include ，方便模版引擎互相添加模版】--------------------------
const vm = require('vm');

function include(name) {
    return templateMap[name]();
}

const templateMap = {
    templateA: '`<h1>${XSSTranslation(user.name)}</h1>`',
    templateB: '`<h1>${include("templateC")}</h1>`',
    templateC: '`<p>✅✅✅✅✅✅</p>`'
};

const context = { 
    user,
    XSSTranslation,
    include
}

Object.keys(templateMap).forEach(key => {
    const template = templateMap[key];
    // 将 template 对象重新组装成 { templateX: [Function (anonymous)]}，该匿名函数返回 '`xxxxx`'；
    templateMap[key] = vm.runInNewContext(`
        (function () {
            return ${template}
        })
    `, context)

    console.log("templateMap[key]", templateMap[key])
})

console.log(templateMap['templateB']())