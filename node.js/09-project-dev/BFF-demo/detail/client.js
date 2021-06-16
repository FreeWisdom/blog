const EasySock = require('easy_sock');          // 实现 node 后台 rcp 通信的模块

// 引入 protobuf 协议
const protobuf = require('protocol-buffers')
const fs = require('fs');
const schemas = protobuf(fs.readFileSync(`${__dirname}/detail.proto`));

// 创建 EasySock 实例
const easySock = new EasySock({ 
    ip: '127.0.0.1',
    port: 4000,
    timeout: 500,       // 设置超时时间
    keepAlive: true     // 是否全双工通信
})

// 请求包二进制编码
easySock.encode = function(data, seq) {
    const body = schemas.ColumnRequest.encode(data);

    const head = Buffer.alloc(8);
    head.writeInt32BE(seq);
    head.writeInt32BE(body.length, 4);

    return Buffer.concat([head, body])
}

// 返回包二进制解码成结构化数据
easySock.decode = function(buffer) {
    const seq = buffer.readInt32BE();
    const body = schemas.ColumnResponse.decode(buffer.slice(8));
    
    return {
        result: body,
        seq
    }
}

// 判断包是否接受完毕，处理粘包&缺包情况
easySock.isReceiveComplete = function(buffer) {
    if (buffer.length < 8) {
        return 0
    }
    const bodyLength = buffer.readInt32BE(4);
    if (buffer.length >= bodyLength + 8) {
        return bodyLength + 8
        
    } else {
        return 0
    }
}

module.exports = easySock;