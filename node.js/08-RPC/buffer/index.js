// const buffer1 = Buffer.from('geekbang')
// const buffer2 = Buffer.from([1, 2, 3, 4])
// const buffer3 = Buffer.alloc(20);

// // console.log(buffer1);
// // console.log(buffer2);
// // console.log(buffer3);

// // 在下标为1的位置 设置值为 12
// buffer2.writeInt8(12, 1)

// console.log('buffer2-1', buffer2);              // buffer2-1 <Buffer 01 0c 03 04>

// // 高位放在前面   // 在下标为2的位置 设置值为 512（512 10进制转16进制为 200）
// buffer2.writeInt16BE(512, 2)
// console.log('buffer2-2', buffer2);              // buffer2-2 <Buffer 01 0c 02 00>


// // 低位放在前面   // 在下标为2的位置 设置值为 512
// buffer2.writeInt16LE(512, 2)
// console.log('buffer2-3', buffer2);              // buffer2-3 <Buffer 01 0c 00 02>

//----【protocol-buffers 二进制编译🧬🧬🧬🧬🧬🧬🧬🧬】---------------------------------------
const fs = require('fs');
const protobuf = require('protocol-buffers');

// 根据协议，编译出一个js逻辑对象，里面包含encode和decode函数
// 实际写web服务器的时候，注意这个操作可以直接在进程启动就做
// 否则在http处理过程里做的话，是一次不必要的性能消耗
const schemas = protobuf(fs.readFileSync(`${__dirname}/test.proto`));

console.log("schemas", schemas)
const buffer = schemas.Course.encode({
    id: 4,
    name: 'hh',
    lesson: []
})

console.log(buffer);

console.log(schemas.Course.decode(buffer));