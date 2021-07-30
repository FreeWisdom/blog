function loadImg(src) {
    const p = new Promise((resolve, reject) => {
        const img = document.createElement('img');
        img.onload = () => {
            resolve(img);
        };
        img.onerror = () => {
            reject(new Error(`图片加载失败${src}`))
        }
        img.src = src;
    })

    return p;
}

const src = 'https://cdn.nlark.com/yuque/0/2021/png/114317/1617976187297-assets/web-upload/83ebdd2f-9fb7-49f6-aeb9-117adae8eaaa.png?x-oss-process=image%2Fresize%2Cw_440';
loadImg(src)
    .then(img => {
        console.log("图片宽为", src.width)
        return img;
    })
    .catch(err => {
        console.log(err);
    })