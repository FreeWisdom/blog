// 编写函数获得对象中的值666，必须使用到 str = 'a.b.c';

const obj = {
    a: {
        b: {
            c: 666
        }
    }
}

const str = 'a.b.c';

function getDeepValue0(obj, str) {
    const strArray = str.split(".");
    strArray.forEach(element => {
        obj = obj[element];
    });
    return obj;
}

function getDeepValue1(obj, str) {
    const strArray = str.split(".");
    const res = strArray.reduce((pre, cur) => {
        // console.log(pre, cur, pre[cur]);
        return pre[cur];
    }, obj)

    return res;
}

function getDeepValue2() {
    try {
        return eval('obj' + '.' + str)
    } catch (e) {
        return undefined
    }
}

// function getDeepValue3(exp) {
//     const segments = exp.split('.')
//     return function (obj) {
//         for (let i = 0, l = segments.length; i < l; i++) {
//             if (!obj) return
//             obj = obj[segments[i]]
//         }
//         return obj
//     }
// }

const deepValue = getDeepValue3(str);
console.log("deepvalue", deepValue)
// console.log(eval(obj.a.b.c))