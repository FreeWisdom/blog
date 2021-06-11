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
