// 父类
class People {
    constructor(name) {
        this.name = name
    }
    eat() {
        console.log(`${this.name} eat something`)
    }
}

// 子类
class Student extends People {
    constructor(name, number) {
        super(name)
        this.number = number
    }
    sayHi() {
        console.log(`姓名 ${this.name} 学号 ${this.number}`)
    }
}

// 子类
class Teacher extends People {
    constructor(name, major) {
        super(name)
        this.major = major
    }
    teach() {
        console.log(`${this.name} 教授 ${this.major}`)
    }
}

// 实例
const xialuo = new Student('夏洛', 100)
console.log(xialuo.name)
console.log(xialuo.number)
xialuo.sayHi()
xialuo.eat()

// 实例
const wanglaoshi = new Teacher('王老师', '语文')
console.log(wanglaoshi.name)
console.log(wanglaoshi.major)
wanglaoshi.teach()
wanglaoshi.eat()


console.log(Teacher instanceof Object);                         // true
console.log(Teacher instanceof People);                         // false
console.log(Student instanceof People);                         // false
console.log(xialuo instanceof Student);                         // true
console.log(xialuo instanceof People);                          // true
console.log(xialuo instanceof Object);                          // true

console.log([] instanceof Array);                               // true
console.log([] instanceof Object);                              // true
console.log(Array instanceof Object);                           // true
console.log({} instanceof Object);                              // true

// class 实际上是一个 function，可见是一个语法糖；
console.log(typeof People);                                     // "function"
console.log(typeof Student);                                    // "function"

console.log(Student.prototype);                                 // People {constructor: ƒ, sayHi: ƒ}
console.log(xialuo.__proto__);                                  // People {constructor: ƒ, sayHi: ƒ}
console.log(Student.prototype === xialuo.__proto__);            // true

console.log(People.prototype);                                  // {constructor: ƒ, eat: ƒ}
console.log(Student.prototype.__proto__);                       // {constructor: ƒ, eat: ƒ}
console.log(People.prototype === Student.prototype.__proto__);  // true

console.log(xialuo.hasOwnProperty("name"));                     // true
console.log(xialuo.hasOwnProperty("sayhi"));                    // false
console.log(xialuo.hasOwnProperty("eat"));                      // false
console.log(xialuo.hasOwnProperty("hasOwnProperty"));           // false