/**
 * 确定是对象
 * @param {any} obj 
 * @returns 
 */
function isObject(obj) {
    if(typeof obj === "object" && obj !== null) {
        return true
    }
}

/**
 * 两个对象全相等
 * @param {any} obj1 
 * @param {any} obj2 
 * @returns 
 */
function isEqual(obj1, obj2) {
    // 必须：若有一个不是 object 直接返回两个的 ===
    if(!isObject(obj1) || !isObject(obj2)) {
        return obj1 === obj2;
    }

    // 优化：快速判断两个参数长度不等情况
    if(Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
    }

    // 优化：快速判断两个参数相等情况
    if(obj1 === obj2) {
        console.log("两个参数相等：", obj1, obj2)
        return true;
    }

    // 必须：若都是 object 则本方法递归遍历两个object的key： obj1[key], obj2[key]
    for (const key in obj1) {
        const res = isEqual(obj1[key], obj2[key]);
        // 若第一个判断中，有非object的内容出现，并对比后 res 为 false ，则两个对象不相等；
        if(!res) {
            return false;
        }
    }

    return true;
}

// const obj1 = {a: 10, b: {x: 100, y: 20}};
// const obj2 = {a: 10, b: {x: 100, y: 200}};

// const obj1 = [1, 2, 3, 4, [1, 2, 3, 4, [1, 2, 3, 4]]];
// const obj2 = [1, 2, 3, 4, [1, 2, 3, 4, [1, 2, 3, 4]]];

// const obj1 = [{a: 1}, 2, {c: 3}];
// const obj2 = [{a: 1}, 2, {c: 3}];

// console.log(isEqual(obj1, obj1));