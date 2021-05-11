// function loadImg(src) {
//     const p = new Promise(
//         (resolve, reject) => {
//             const img = document.createElement('img')
//             img.onload = () => {
//                 resolve(img)
//             }
//             img.onerror = () => {
//                 const err = new Error(`图片加载失败 ${src}`)
//                 reject(err)
//             }
//             img.src = src
//         }
//     )
//     return p
// }

// // const url = 'https://img.mukewang.com/5a9fc8070001a82402060220-140-140.jpg'
// // loadImg(url).then(img => {
// //     console.log(img.width)
// //     return img
// // }).then(img => {
// //     console.log(img.height)
// // }).catch(ex => console.error(ex))

// const url1 = 'https://img.mukewang.com/5a9fc8070001a82402060220-140-140.jpg'
// const url2 = 'https://img3.mukewang.com/5a9fc8070001a82402060220-100-100.jpg'

// loadImg(url1).then(img1 => {
//     console.log(img1.width)
//     return img1 // 普通对象
// }).then(img1 => {
//     console.log(img1.height)
//     return loadImg(url2) // promise 实例
// }).then(img2 => {
//     console.log(img2.width)
//     return img2
// }).then(img2 => {
//     console.log(img2.height)
// }).catch(ex => console.error(ex))

// function loadImg(src) {
//     const p = new Promise(
//         (resolve, reject) => {
//         const img = document.createElement("img");
//         img.src = src;

//         img.onload = () => {
//           resolve(img);
//         };
//         img.onerror = () => {
//                   const err = new Error(`图片加载失败${src}`);
//           reject(err);
//         };
//       }
//     )
//     return p;
//   }
  
//   const url1 = "https://images.pexels.com/photos/7763793/pexels-photo-7763793.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500";
//   const url2 = "https://images.pexels.com/photos/163444/sport-treadmill-tor-route-163444.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500";
  
//   loadImg(url1).then(img1 => {
//     console.log(img1.width);
//     return img1;
//   }).then(img1 => {
//     console.log(img1.height);
//     return loadImg(url2);
//   }).then(img2 => {
//     console.log(img2.width);
//     return img2;
//   }).then(img2 => {
//     console.log(img2.height);
//   }).catch(err => {
//     cosnole.log(err);
//   })

function loadImg(src) {
  return new Promise(
  	(resolve, reject) => {
      const img = document.createElement("img");
      img.src = src;
     	img.onload = () => {
        resolve(img);
      };
      img.onerror = () => {
        reject(err);
      }
    }
  )
}

const url1 = "https://cdn.nlark.com/yuque/0/2021/png/114317/1620345547660-assets/web-upload/8254db4f-cc29-4ac7-be38-7b1924a47497.png?x-oss-process=image%2Fresize%2Cw_440";
const url2 = "https://cdn.nlark.com/yuque/0/2021/png/114317/1620353009108-assets/web-upload/8ad45347-b5f0-4485-a3f3-0ba7cb881565.png?x-oss-process=image%2Fresize%2Cw_440";

(async function () {
  const img1 = await loadImg(url1);
  console.log(img1.height, img1.width);
  
  const img2 = await loadImg(url2);
  console.log(img2.height, img2.width);
})();