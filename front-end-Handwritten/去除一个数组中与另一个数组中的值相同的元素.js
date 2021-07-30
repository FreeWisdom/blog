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

function array_diff(a, b) {
    for (var i = 0; i < b.length; i++) {
        for (var j = 0; j < a.length; j++) {
            if (isEqual(a[j], b[i])) {
                a.splice(j, 1);
                j = j - 1;
            }
        }
    }
    return a;
}

arra = [
    {
        id: 1,
        name: "zhz"
    }, 
    {
        id: 2,
        name: "thales"
    },
    {
        id: 3,
        name: "xiaozhen"
    },
    {
        id: 4,
        name: "zhen"
    }
];

arrb = [
    {
        id: 3,
        name: "xiaozhen"
    },
    {
        id: 4,
        name: "zhen"
    }
];

// console.log(arra)
// console.log(arra.splice(2, 1))
// console.log(arra)

// const newArray = array_diff([1, 2], [1]);
const newArray2 = array_diff(arra, arrb);
console.log(newArray2)