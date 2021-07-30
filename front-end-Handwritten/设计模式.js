var event = {};                 // 发布者
event.clientList = []           //发布者的缓存列表

event.listen = function (fn) {  // 增加订阅者函数
    this.clientList.push(fn)
}

event.trigger = function () {  // 发布信息
    for (var i = 0; i < this.clientList.length; i++) {
        var fn = this.clientList[i];
        fn.apply(this, arguments);
    }
}

event.listen(function (time) {
    console.log('正式上班时间为：' + time)
})
event.trigger('2018/7');