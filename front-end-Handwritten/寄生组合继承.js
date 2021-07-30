// 核心：结合借用构造函数传递参数和寄生模式实现继承


function inheritPrototype(subtype, supType) {
    var prototype = Object.create(supType.prototype);
    prototype.constructor = subtype;
    subtype.prototype = prototype;
}

// 父类初始化实例属性和原型属性
function SupType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SupType.prototype.sayName = function () {
    alert(this.name);
};

// 借用构造函数传递增强子类实例属性（支持传参和避免篡改）
function SubType(name, age) {
    SupType.call(this, name);
    this.age = age;
}

// 将父类原型指向子类
inheritPrototype(SubType, SupType);

// 新增子类原型属性
SubType.prototype.sayAge = function () {
    alert(this.age);
}

var instance1 = new SubType("xyc", 23);
var instance2 = new SubType("lxy", 23);

instance1.colors.push("2"); // ["red", "blue", "green", "2"]
instance1.colors.push("3"); // ["red", "blue", "green", "3"]

console.log(instance1)
console.log(instance2)