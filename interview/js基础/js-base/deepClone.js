/**
 * 深拷贝
 */

const obj1 = {
    age: 20,
    name: 'xxx',
    address: {
        city: 'beijing'
    },
    arr: ['a', 'b', 'c']
}

const obj2 = deepClone(obj1)
obj2.address.city = 'shanghai'
obj2.arr[0] = 'a1'
console.log(obj1.address.city)
console.log(obj1.arr[0])

/**
 * 深拷贝
 * @param {Object} obj 要拷贝的对象
 */
function deepClone(obj = {}) {
    if (typeof obj !== 'object' || obj == null) {
        // obj 是 null ，或者不是对象和数组，直接返回
        return obj
    }

    // 初始化返回结果
    let result
    if (obj instanceof Array) {
        result = []
    } else {
        result = {}
    }

    for (let key in obj) {
        // 保证 key 不是原型的属性
        if (obj.hasOwnProperty(key)) {
            // 递归调用！！！
            result[key] = deepClone(obj[key])
        }
    }

    // 返回结果
    return result
}
// function deepClone(obj = {}) {
//     // 若obj为null或obj不是引用类型"object"，直接返回obj；
//     if (typeof obj !== "object" || obj == null) {
//         return obj;
//     }

//     // 初始化返回值result；
//     let result;
//     if (obj instanceof Array) {
//         result = [];
//     } else {
//         result = {};
//     };

//     // 保证key不是原型属性，然后递归付值
//     for (let key in obj) {
//         if (obj.hasOwnProperty(key)) {
//             result[key] = deepClone(obj[key]);
//         }
//     };

//     return result;
// }


function deepClone(obj) {
    if(typeof obj !== 'object' && obj === null) {
        return obj;
    };

    let res;
    if(obj instanceof Array) {
        res = [];
    } else {
        res = {}
    };
    for (let key of obj) {
        if(obj.hasOwnProperty(key)) {
            res[key] = deepClone(obj[key])
        }
    };
    return res;
}