# 1、栈

* 【特点】先进后出

* 【代码实现】

  ```js
  function Stack() {
    this.stack = [];
    this.push = function (item) {
      this.stack.push(item);
    };
    this.pop = function () {
      return this.stack.pop();
    };
  }
  ```

# 2、队列

* 【特点】先进先出

* 【代码实现】

  ```js
  function Queue() {
    this.queue = [];
    this.enquque = function (item) {
      this.queue.push(item);
    };
    this.dequeue = function () {
      return this.queue.shift();
    };
  }
  ```

# 3、链表

* 【特点】

# 4、集合

# 5、字典

# 6、树

# 7、图

# 8、堆

