# RPC（Remote Procedure Call 远程过程调用）

# 1、RPC & Ajax

## 1.1、概述

* 相同点：
  * 都是两个计算机之间的网络通信；
    * RPC 是服务器与服务器之间的通信；
    * Ajax 是浏览器与服务器之间的通信；
  * 都需要通信双方约定一个数据格式；
* 不同点：
  * 使用不同寻址服务：
    * Ajax 使用 DNS 作为寻址服务；
      * 即，一般浏览器发送 HTTP 请求，要使用 DNS 寻址；
    * RPC 通信一般是在内网里互相请求，使用 DNS 寻址不划算；
  * 交互方式不同：
    * Ajax 应用层协议一般使用 HTTP 文本协议；
    * RPC 通信一般使用 TCP 协议的二进制交互，取代 HTTP 协议的文本交互；
  * 以什么协议作为基础协议不同：
    * Ajax 基于 “HTTP 协议”；
    * RPC 通信基于 “TCP协议” 或 “UDP协议”；

## 1.2、详述

### 1.2.1、RPC 和 Ajax 的不同寻址方式

* Ajax 使用 DNS 寻址：

  <img src="https://cdn.nlark.com/yuque/0/2021/jpeg/114317/1623316889221-c2d7cdd8-6ccd-4f44-b96c-b6971dea7e05.jpeg" alt="img" style="zoom:50%;" />

* RPC 使用特有服务寻址：

  <img src="https://cdn.nlark.com/yuque/0/2021/jpeg/114317/1624006688433-cf177eac-07f4-4005-a4ab-47db576622a5.jpeg" alt="img" style="zoom:50%;" />

### 1.2.2、RPC 和 Ajax 基于不同的通信协议

* Ajax 基于 HTTP 协议的通信方式；

* RPC 基于 TCP（Transmission Control Protocol）协议的通信方式：
  * 单工通信：
    * TCP链接过程中，只能一方向另外一方发数据，只能客户端发数据给服务器，或只能服务器发数据给客户端；
  * 半双工通信
    * 客户端向服务器发送数据，只有经过发送数据的这段时间之后。 服务器才能向客户端发送数据；
    * 服务器向客户端发送数据，只有经过发送数据的这段时间之后。 客户端才能向服务器发送数据；
    *  **可以理解为一个独木桥，一段时间内只能有一个方向的人通过** 
  * 全双工通信
    * 客户端和服务端能自由通信；
    *  **可以理解为双向车道，两个方向互不影响** ；
    *  **问题： 实现难度更大， 成本更高** 

### 1.2.3、RPC 和 Ajax 基于不同协议导致的不同交互方式

* Ajax 基于 HTTP 协议的通信方式，是**文本协议**，离程序员近，需要人类理解，故文本协议**可读性更强**；
  * HTML
  * JSON
* RPC 基于 TCP 协议的通信方式，是**二进制协议**，离计算机近，需要计算机理解，故二进制**编解码更快&体积更小**；
  * 二进制包

# 2、Node.js Buffer 编解码二进制数据包

## 2.1、创建+操作 buffer

* `Buffer` 对象是 Node 处理二进制数据的一个接口。它是Node 原生提供的全局对象，可以直接使用，不需要`require('buffer')`。

* 创建 Buffer

  * 使用 Buffer.from()、Buffer.alloc() 和 Buffer.allocUnsafe() 方法可以创建 buffer

  ```js
  const buffer1 = Buffer.from('geekbang');		// 通过字符串创建 buffer
  const buffer2 = Buffer.from([1, 2, 3, 4]);	// 通过数组创建 buffer
  const buffer3 = Buffer.alloc(20);						// 创建长度为参数的 buffer
  
  console.log(buffer1);
  console.log(buffer2);
  console.log(buffer3);
  
  /*
  <Buffer 67 65 65 6b 62 61 6e 67>
  <Buffer 01 02 03 04>
  <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>
  */
  ```

* 操作 buffer

  ```js
  const buffer4 = Buffer.from([1, 2, 3, 4])
  
  // 在下标为1的位置 设置值为 12
  buffer4.writeInt8(12, 1)
  
  console.log('buffer4-1', buffer2);              // buffer4-1 <Buffer 01 0c 03 04>
  
  // 高位放在前面
  // 在下标为2的位置 设置值为 512（512 10进制转16进制为 200）
  buffer4.writeInt16BE(512, 2)
  console.log('buffer4-2', buffer2);              // buffer4-2 <Buffer 01 0c 02 00>
  
  
  // 低位放在前面
  // 在下标为2的位置 设置值为 512
  buffer4.writeInt16LE(512, 2)
  console.log('buffer4-3', buffer2);              // buffer4-3 <Buffer 01 0c 00 02>
  ```

  * 每次要设置，都需要知道下标及具体的值。 肯定没有 JSON格式数据来的方便。  因此就出现了一个东西 `protocal buffer` 谷歌开发的一个二进制协议编码库，可以实现类似 JSON.Stringfy() 这样方便的编码方式；

## 2.2、protocol-buffers 简化二进制编码

```protobuf
message Course {
    required float id = 1;
    required string name = 2;
    repeated Lesson lesson = 3;
}

message Lesson {
    required float id = 1;
    required string title = 2;
}
```

```js
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
```

# 3、Node.js net 建立多路复用 RPC 通道

## 3.1、多路复用

* 就是在一个通信通路（tcp连接）上多次进行通信，减少建立连接的消耗。所以最好要求通信通路支持全双工通信

## 3.2、实现半双工通信

* 思路：发送，接收，再发送

> server.js

```js
const net = require('net');

// 创建tcp服务器
const server = net.createServer((socket) => {

    socket.on('data', function(buffer) {
        // 从传来的buffer里读出一个int32
        const lessonid = buffer.readInt32BE();

        // 50毫秒后回写数据
        setTimeout(()=> {
            socket.write(
                Buffer.from(data[lessonid])
            );
        }, 50)
    })

});

// 监听端口启动服务
server.listen(4000);

const data = {
    136797: "01 | 觉醒年代",
    136798: "02 | 山河令",
    136799: "03 | 陈情令",
    136800: "04 | 天真热"
}
```

> client.js

```js
const net = require('net');

// 创建socket
const socket = new net.Socket({});

// 连接服务器
socket.connect({
    host: '127.0.0.1',
    port: 4000
});


const lessonids = [
    "136797",
    "136798",
    "136799"
]

let id = Math.floor(Math.random() * lessonids.length);

// 往服务器传数据
socket.write(encode(id));

socket.on('data', (buffer) => {
    console.log(buffer.toString())

    // 接收到数据之后，按照半双工通信的逻辑，马上开始下一次请求
    id = Math.floor(Math.random() * lessonids.length);
    socket.write(encode(id));
})

// 把编码请求包的逻辑封装为一个函数
function encode(index) {
    buffer = Buffer.alloc(4);
    // 将 lessonids 中的某一项转换成 16 进制，放到长度为 4 的 buffer 中；
        // 【如：136798 ==转16==> 2165e】放入 <Buffer 00 02 16 5e>
    buffer.writeInt32BE(lessonids[index]);
    return buffer;
}
```

## 3.3、🤔️实现全双工通信

* 问题：客户端发送多个请求，服务端无序返回多个请求后，客户端无法将发出的请求和接收的返回一一对应；

* 半双工通信的基础上实现全双工通信思路：

  1. 包序号：

     * 每个请求包都带上序号，返回包也带有请求时的序号；

     * 客户端根据序号可以把请求包和返回包一一对应；

  2. 粘包/不完整包：

     * 由于 TCP 链接底层优化时，会自动将发送的包拼接成一个大包，一次性发送，即为 TCP 链接的 “粘包” 机制；

     * 需要有标记包长的字段；

  3. 网络连接的错误处理；

