/**
 * 简单的进程守护器
 */
const cluster = require('cluster');

if (cluster.isMaster) {
    for (let i = 0; i < require('os').cpus().length / 2; i++) {
        createWorker();
    }

    // ②--偶尔进程会挂掉，5秒后，主进程重新分配一个子进程去补充挂掉的子进程；
    cluster.on('exit', function () {
        setTimeout(() => {
            createWorker()
        }, 5000)
    })

    // ④--createWorker 中添加心跳包
    function createWorker() {
        // 创建子进程并进行心跳监控
        var worker = cluster.fork();

        var missed = 0;// 没有回应的ping次数

        // 心跳
        var timer = setInterval(function () {

            // 三次没回应，杀之
            if (missed == 3) {
                clearInterval(timer);
                console.log(worker.process.pid + ' has become a zombie!');
                process.kill(worker.process.pid);
                return;
            }
            // 开始心跳
            missed++;
            worker.send('ping#' + worker.process.pid);
        }, 10000);

        worker.on('message', function (msg) {
            // 确认心跳回应。
            if (msg == 'pong#' + worker.process.pid) {
                missed--;
            }
        });

        // 挂了就没必要再进行心跳了
        worker.on('exit', function () {
            clearInterval(timer);
        });
    }

} else {
    // ①--监听 uncaughtException 事件，node.js 不会因为出现 uncaughtException 错误而退出进程；
    process.on('uncaughtException', function (err) {
        // 这里可以做写日志的操作
        console.log(err);
        // 监听该进程，会取消默认行为exit(1)，所以再需手动添加退出进程的默认行为
        process.exit(1);
    });

    // 回应心跳信息
    process.on('message', function (msg) {
        if (msg == 'ping#' + process.pid) {
            process.send('pong#' + process.pid);
        }
    });

    // ③--内存使用过多（如，内存泄漏），自杀
    if (process.memoryUsage().rss > 734003200) {
        console.log("oom")
        process.exit(1);
    }

    require('./entry')
}