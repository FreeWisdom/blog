function getCar(brand, model) {
    console.log(brand);         // 第一个参数是字符串值数组；       // ["the brand of your car is ",  " and the model is {model}"]
    console.log(model);         // 其余参数获取传递的表达式的值；    // 福特
}
const brand = "福特";
const model = "mazida";

getCar`the brand of your car is ${brand} and the model is {model}`