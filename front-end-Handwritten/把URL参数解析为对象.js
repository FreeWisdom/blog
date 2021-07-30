const url = 'http://witmax.cn/?key0=0&key1=1&key2=2%E2%80%9D%EF%BC%9B';

function parseLocationSearch() {
    const res = {};
    const paramsList = new URLSearchParams(location.search);
    for (const iterator of paramsList) {
        res[iterator[0]] = iterator[1]
    }
    return res;
}

// parseLocationSearch()

function parseUrl(url) {
    const res = {};
    const paramStr = url.split('?')[1];
    const paramArr = paramStr.split('&');
    for (const iterator of paramArr) {
        const keyValArr = iterator.split('=');
        res[keyValArr[0]] = keyValArr[1];
    }
    console.log(res);
    return res;
}
parseUrl(url)