// 节流
function throttle(fn, delay = 300) {
    let timer = null;
    return function () {
        if(timer) {
            return;
        }
        timer = setTimeout(() => {
            fn.applay(this, arguments);
            timer = null;
        }, delay)
    }
}

// 防抖
function debounce(fn, delay = 300) {
    let timer = null;
    return function () {
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.applay(this, arguments);
            timer = null;
        }, delay)
    }
}