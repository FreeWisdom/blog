const str = 'aabcmmkmodxxxxxxaaaa';

function getMostStr(str) {
    const mostOne = {
        maxName: '',
        maxNum: -1
    };
    var obj = {};

    for (let i = 0; i < str.length; i++) {
        var key = str[i];
        typeof obj[key] === 'undefined' ? obj[key] = 1 : obj[key] ++;
    }

    for (const key in obj) {
        if(mostOne.maxNum < obj[key]) {
            mostOne.maxNum = obj[key];
            mostOne.maxName = key;
        }
    }
    return mostOne
}

console.log(getMostStr(str))