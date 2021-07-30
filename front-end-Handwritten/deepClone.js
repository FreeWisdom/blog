/**
 * 一、无脑版：
 * ①【同deepClone0】如果对象中存在循环引用的情况也无法正确实现深拷贝；
 * ②【同deepClone0】如果 data 里有RegExp、Error对象，则序列化的结果将只得到空对象；
 * ③【似deepClone0】如果 data 里面有时间对象，则JSON.stringify后再JSON.parse的结果，时间将只是字符串的形式。而不是时间对象；
 * ④如果 data 里有函数，undefined，则序列化的结果会把函数置为undefined或丢失；
 * ⑤如果 data 里有NaN、Infinity和-Infinity，则序列化的结果会变成null;
 */
//  JSON.parse(JSON.stringify())


/**
 * 二、基础版：
 * ①【同JSON】如果对象中存在循环引用的情况也无法正确实现深拷贝；
 * ②【同JSON】如果 obj 里面有RegExp、Error对象，则序列化的结果将只得到空对象；
 * ③【似JSON】如果 obj 里面有时间对象，deepClone深拷贝后的时间对象变为空对象{};
 */
function deepClone0(obj) {
    const res = obj instanceof Array ? [] : {};

    // 若obj为null或obj不是引用类型"object"，即，不是对象也不是数组时候，直接返回obj；
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }

    for (let key in obj) {
        // 另外使用 for...in 循环遍历对象的属性时，其原型链上的所有属性都将被访问;
        // 如果只要只遍历对象自身的属性，而不遍历继承于原型链上的属性，要使用 hasOwnProperty 方法过滤一下。
        if (obj.hasOwnProperty(key)) {
            res[key] = deepClone0(obj[key])
        }
    }

    return res;
}

/**
 * 三、进阶版：解决以上所有问题
 */
 function deepClone1(target) {
    function clone(target, map) {
        if (target !== null && typeof target === 'object') {
            let result = target instanceof Array ? [] : {};

            if (target.constructor === Date)
                return target       // 日期对象直接返回一个新的日期对象
            if (target.constructor === RegExp)
                return target       // 正则对象直接返回一个新的正则对象
            if (target.constructor === Error)
                return target       // 错误对象直接返回一个新的错误对象

            // 解决循环引用问题，我们可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系；
            // 当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象；
            // 如果有的话直接返回，如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。
            if (map.has(target)) {
                return map.get(target);
            }
            map.set(target, result);

            for (let k in target) {
                if (target.hasOwnProperty(k)) {
                    result[k] = clone(target[k], map)
                }
            }

            return result;
        } else {
            return target;
        }
    }

    let map = new Map();
    const result = clone(target, map);
    map.clear();
    map = null;
    return result
}

/**
 * 四、优化版
 * ①weakmap 优化 map
 * ②while 优化 for in
 */
function deepClone2(target) {
    /**
     * 遍历数据处理函数
     * @array 要处理的数据
     * @callback 回调函数，接收两个参数 value 每一项的值 index 每一项的下标或者key。
    */
    function handleWhile(array, callback) {
        const length = array.length;
        let index = -1;
        while (++index < length) {
            callback(array[index], index)
        }
    }
    function clone(target, map) {
        if (target !== null && typeof target === 'object') {
            let result = target instanceof Array ? [] : {};

            // 解决循环引用
            if (map.has(target)) {
                return map.get(target);
            }
            map.set(target, result);

            const keys = target instanceof Array ? undefined : Object.keys(target);

            function callback(value, key) {
                if (keys) {
                    // 如果keys存在则说明value是一个对象的key，不存在则说明key就是数组的下标。
                    key = value;
                }
                result[key] = clone(target[key], map)
            }

            handleWhile(keys || target, callback)

            return result;
        } else {
            return target;
        }
    }
    let map = new WeakMap();
    const result = clone(target, map);
    map = null;
    return result
}


let obj1 = {
    a: 1,
    b: 2,
    c: {
        d: undefined,
        e: new Date(1536627600000),
        f: { h: Symbol("test") },
        h: function () { console.log("xxx") },
        j: {
            i: [1, 2, 3],
            k: new RegExp(/\d/),
            l: new Error('错误'),
            m: NaN,
            n: 1.7976931348623157E+10308,
            o: -1.7976931348623157E+10308,
        }
    }
};
// obj1.c.f.g = obj1;

// const obj2 = deepClone1(obj1);
// const obj2 = JSON.parse(JSON.stringify(obj1))

function deepCloneA(target) {
    function clone(target, map) {
        if(typeof target === 'object' && target !== null) {
            const result = target instanceof Array ? [] : {};

            if(map.has(target)) {
                return map.get(target);
            };
            map.set(target, result);

            for (const key in target) {
                if (target.hasOwnProperty(key)) {
                    result[key] = clone(target[key], map);
                }
            }

            return result;
        } else {
            return target;
        }
    };

    let map = new Map();
    const res = clone(target, map);
    map.clear();
    map = null;
    return res;
}

const obj2 = deepCloneA(obj1)
console.log(obj1);
console.log(obj2);