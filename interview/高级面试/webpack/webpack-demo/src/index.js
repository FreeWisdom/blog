// 引入 css
import './style/style1.css'
import './style/style2.less'

import { sum } from './math'
const sumRes = sum(10, 20)
console.log('sumRes', sumRes)

// --------------------------------------------------
// // 增加，开启热更新之后的代码逻辑
// if (module.hot) {
//     module.hot.accept(['./math'], () => {
//         const sumRes = sum(10, 30)
//         console.log('sumRes in hot', sumRes)
//     })
// }

// ---------------------------------------------------
import moment from 'moment'
import 'moment/locale/zh-cn'
// import 'moment/locale/en-au'
// moment.locale('zh-cn')
console.log("local", moment.locale())
console.log("date", moment().format('LLL'))

// ---------------------------------------------------
// 引入动态数据
// setTimeout(() => {
//     // 定义一个 chunk
//     import('./dynamic-data.js').then(res => {
//         console.log(res.default.message)
//     })
// }, 2000)

// ---------------------------------------------------
import img1 from './img/1.png'
import img2 from './img/2.jpeg'

function insertImg(src) {
    const img = new Image();
    img.src = src;
    document.body.appendChild(img);
}

insertImg(img1);
insertImg(img2);