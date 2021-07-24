# 数组基操

## 1、创建一个数组

### 1.1、字面量

```js
const a = [1, 2, 3];		// [1, 2, 3]
```

### 1.2、构造器

```js
// ⚠️ new Array() 和 Array() 效果一样，加不加 new 一点影响都没有。
const a = Array();			  		// []
const b = Array(4);				  	// [empty × 4]
const c = Array(1, 1, 3, 4);	// [1, 1, 3, 4]
```

### 1.3、ES6 `Array.of()`

```js
// ✅ 解决了构造器创建数组，因传入参数的不同而导致的行为差异
const a = Array.of(3);				// [3]
const b = Array.of(1, 1, 2);	// [1, 1, 2]
```

### 1.4、ES6 `Array.from()`

1. 将两种对象转为真正的数组：

   1. 部署了Iterator接口的对象，比如：Set，Map，Array。

   2. 类数组对象，什么叫类数组对象，就是一个对象必须有length属性，没有length，转出来的就是空数组。

2. 参数：

   * 第一个参数(必需)：要转化为真正数组的对象。
   * 第二个参数(可选)：类似数组的map方法，对每个元素进行处理，将处理后的值放入返回的数组。
   * 第三个参数(可选)：用来绑定this。

   ```js
   // 1. 对象拥有length属性，key 值为 0 1 2 ...
   let obj = {0: 'a', 1: 'b', 2:'c', length: 3};
   let arr = Array.from(obj); 													// ['a','b','c'];
   
   // 2. 部署了 Iterator接口的数据结构;
   // 比如:字符串、Set、NodeList对象
   let arr = Array.from('hello'); 											// ['h','e','l','l','o']
   let arr = Array.from(new Set(['a','b'])); 					// ['a','b']
   ```

3. 填充数组

   1. 使用【值】填充数组

   ```js
   const length = 3;
   const init = 0;
   
   // ✅ 使用 Array.from()
   const res = Array.from({length}, () => init);				// [0, 0, 0]
   
   // ✅ 使用 Array.fill()
   const res1 = Array(length).fill(0);									// [0, 0, 0]
   ```

   2. 使用【对象】填充数组

   ```js
   const length = 3;
   
   // ✅ 使用 Array.from() 正常，填充不同的空对象
   const res = Array.from({length}, () => ({}));				// [{}, {}, {}]
   res[0].a = 'zhz';																		// [{a: 'zhz'}, {}, {}]
   
   // ❌ 使用 Array.fill() 不正常，填充同一个对象
   const res1 = Array(length).fill({});								// [{}, {}, {}]
   res1[0].a = 'thales';																// [{a: 'thales'}, {a: 'thales'}, {a: 'thales'}]
   ```

4. 深克隆一个数组

   1. 单维数组

      ```js
      const numbers = [3, 6, 9];
      const numbersCopy = Array.from(numbers);
      numbers === numbersCopy;				// false
      
      numbers[3] = 99;
      console.log(numbers);						// [3, 6, 9, 99]
      console.log(numbersCopy);				// [3, 6, 9]
      ```

   2. 多维数组

      ```js
      function recursiveClone(val) {
          return Array.isArray(val) ? Array.from(val, recursiveClone) : val;
      }
      
      const numbers = [[0, 1, 2], ['one', 'two', 'three']];
      const numbersClone = recursiveClone(numbers);
      
      numbersClone; 											// [[0, 1, 2], ['one', 'two', 'three']]
      numbers[0] === numbersClone[0];			// false
      
      numbers[1][3] = 'four';
      console.log(numbers);								// [[0, 1, 2], ['one', 'two', 'three', 'four']]
      console.log(numbersClone);					// [[0, 1, 2], ['one', 'two', 'three']]
      ```

## 2、♨️不改变原数组的方法8⃣️个

>     【ES5】slice、join、toLocateString、toString、cancat、indexOf、lastIndexOf、
>     【ES7】includes

### 2.1、♨️`arr.slice(begin, end)`

* 【定义】⚠️对数组arr中，slice由begin, end选中的(包括begin，不包括end)，部分或全部内容，做浅拷贝；

* 浅拷贝只影响引用类型，不影响简单类型

  ```js
  let a = [{name:'OBzhz'}, {name: 'thales'}, {name: 'zhz'}];
  let b = a.slice(0, 2);
  console.log(a);				// [{name:'OBzhz'}, {name: 'thales'}, {name: 'zhz'}]
  console.log(b);				// [{name:'OBzhz'}, {name: 'thales'}]
  
  // 浅拷贝 let c = a.slice() 可以完成 c 对 a 的浅拷贝；
  // 同理 b 浅拷贝了 a 部分对象，如下：
  b[0].name = 'zhe';
  console.log(a); 			// [{name:'zhe'}, {name: 'thales'}, {name: 'zhz'}]
  console.log(b);				// [{name:'zhe'}, {name: 'thales'}]
  ```

### 2.2、♨️`arr.join(str)`

* 【定义】 join() 方法用于把 arr 数组中的所有元素通过指定的分隔符进行分隔放入一个字符串 str ，返回生成的字符串。

* 数组中为简单类型

  ```js
  let a = ['hello','world'];
  let str = a.join(); 					// 'hello,world'
  let str2 = a.join('+'); 			// 'hello+world'
  ```

* 数组中含有引用类型

  * `join()` 方法在数组元素是数组的时候，会将里面的数组也调用 `join()` ；
  * 如果是对象的话，对象会被转为 `[object Object]` 字符串。

  ```js
  const c = [['zhz', 'thales'], 'zhe', {name: 'zhen'}];
  const d = c.join('-');			// "zhz,thales-zhe-[object Object]"
  ```

### 2.3、`arr.toLocaleString()` 

* 【定义】返回一个表示数组元素的字符串。该字符串由数组中的每个元素的 toLocaleString() 返回值经调用 join() 方法连接（由逗号隔开）组成。

* 【参数】🈚️

  ```js
  const a = ['zhz', ['thales', 'zhen'], {name: 'hanhan'}]
  const b = a.toLocaleString();				// "zhz,thales,zhen,[object Object]"
  ```

### 2.4、`arr.toString()` 

* 【定义】toString() 方法可把数组转换为由逗号链接起来的字符串。

* 【🙅‍♂️】该方法的效果和join方法一样，都是用于数组转字符串的，但是与join方法相比没有优势，也不能自定义字符串的分隔符，因此不推荐使用。

* 【参数】🈚️

  ```js
  // ⚠️ 当数组和字符串操作的时候，js 会调用这个方法将数组自动转换成字符串
  let b= [ 'toString','演示'].toString(); 				// toString,演示
  let a= ['调用toString','连接在我后面']+'啦啦啦'; 	// 调用toString,连接在我后面啦啦啦
  ```

### 2.5、♨️`arr.concat(arrX,......,arrX)` 

* 【定义】 方法用于合并两个或多个数组，返回一个新数组。

* 【参数】arrX（必须）该参数可以是具体的值，也可以是数组对象。可以是任意多个。

  ```js
  let a = [1, 2, 3];
  let b = [4, 5, 6];
  
  //连接两个数组
  let newVal=a.concat(b); 															// [1,2,3,4,5,6]
  // 连接三个数组
  let c = [7, 8, 9]
  let newVal2 = a.concat(b, c); 												// [1,2,3,4,5,6,7,8,9]
  
  // 添加元素
  let newVal3 = a.concat('添加元素',b, c,'再加一个'); 		 // [1,2,3,"添加元素",4,5,6,7,8,9,"再加一个"]
  
  // 合并嵌套数组  会浅拷贝嵌套数组
  let d = [1,2 ];
  let f = [3,[4]];
  let newVal4 = d.concat(f); 														// [1,2,3,[4]]
  ```

### 2.6、♨️`arr.indexOf(searchElement,fromIndex)`

* 【定义】 返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。

* 【参数】

  * searchElement(必须):被查找的元素；
  * fromIndex(可选):开始查找的位置(不能大于等于数组的长度，返回-1)，接受负值，默认值为0。

* 【使用场景】数组去重

* ⚠️ 

  * indexOf()不能识别`NaN` ；
  * 严格相等的搜索：数组的indexOf搜索跟字符串的indexOf不一样，数组的indexOf使用严格相等`===`搜索元素，即**数组元素要完全匹配**才能搜索成功。

  ```js
  let a=['啦啦',2,4,24,NaN]
  console.log(a.indexOf('啦'));  			// -1 
  console.log(a.indexOf('NaN'));  		// -1 
  console.log(a.indexOf('啦啦')); 		 // 0
  console.log(q.indexOf('啦啦', -1));	 // -1
  ```

### 2.7、`arr.lastIndexOf(searchElement,fromIndex)` 

* 【定义】 方法返回指定元素,在数组中的最后一个的索引，如果不存在则返回 -1。（从数组后面往前查找）；

* 【参数】

  * searchElement(必须): 被查找的元素；
  * fromIndex(可选): 逆向查找开始位置，默认值数组的长度-1，即查找整个数组。fromIndex有三个规则：
    1. 正值。如果该值大于或等于数组的长度，则整个数组会被查找。
    2. 负值。将其视为从数组末尾向前的偏移。(比如-2，从数组最后第二个元素开始往前查找)。
    3. 负值。其绝对值大于数组长度，则方法返回 -1，即数组不会被查找。

  ```js
  const a = ["zhz", 1, "zhz", 2, "thales", 44, 55, "zhe"];
  console.log(a.lastIndexOf('zhz'));				// 2
  console.log(a.lastIndexOf('zhz', 0));			// 0
  console.log(a.lastIndexOf('zhz', 1));			// 0
  console.log(a.lastIndexOf('zhz', 2));			// 2
  console.log(a.lastIndexOf('zhz', 3));			// 2
  console.log(a.lastIndexOf('zhz', 99));		// 2
  console.log(a.lastIndexOf('zhz', -6));		// 2
  console.log(a.lastIndexOf('zhz', -7));		// 0
  console.log(a.lastIndexOf('zhz', -99));		// -1
  ```

### 2.8、♨️ES7 `arr.includes(searchElement, fromIndex=0)`

* 【定义】返回一个布尔值，表示某个数组是否包含给定的值；

* 【参数】

  * searchElement(必须)：被查找的元素；
  * fromIndex(可选)：默认值为0，参数表示搜索的起始位置，接受负值。
    * 正值超过数组长度，数组不会被搜索，返回false。
    * 负值绝对值超过长数组度，重置从0开始搜索。

* **includes方法是为了弥补indexOf方法的缺陷而出现的:**

  1. indexOf方法不能识别`NaN` ；
  2. indexOf方法检查是否包含某个值不够语义化，需要判断是否不等于`-1`，表达不够直观；

  ```js
  let a=['thales', 'zhz', 1, NaN];
  let b = a.includes(NaN); 					// true 识别NaN
  let b = a.includes('zhz', 100); 	// false 超过数组长度 不搜索
  let b = a.includes('zhz', -3);  	// true 从倒数第三个元素开始搜索 
  let b = a.includes('zhz', -100);  // true 负值绝对值超过数组长度，搜索整个数组
  ```

## 3、♨️改变原数组的方法9⃣️个

>     【ES5】a.splice()、a.sort()、a.pop()、a.shift()、a.push()、a.unshift()、a.reverse()
>     【ES6】a.copyWithin()、a.fill()

### 3.1、`arr.splice(index,howmany,item1,...,itemX)` 

* 【定义】 splice() 方法（向/从）数组中（添加/删除）项目，然后返回被删除的项目；

* 【参数】

  1. index：必需。整数，规定（添加/删除）项目的位置，使用负数可从数组结尾处规定位置。
  2. howmany：可选。要删除的项目数量。如果设置为 0，则不会删除项目。
  3. item1, ..., itemX： 可选。向数组添加的新项目。

* 【返回值】如果有元素被删除,返回包含被删除项目的新数组。

  ```js
  // 删除元素    
  let a = [1, 2, 3, 4, 5, 6, 7];
  let aa = a.splice(0, 3); 					// [1,2,3]		从数组下标0开始，删除3个元素
  console.log(a); 									// [4,5,6,7]
  let ab = a.splice(-1, 3); 				// [7]				从最后一个元素开始删除3个元素，因为最后一个元素，所以只删除了7
  console.log(a); 									// [4,5,6]
  
  // 删除并添加
  let b = [1, 2, 3, 4, 5, 6, 7];
  let ba = b.splice(0, 3, 'zhz');		// [1, 2, 3]	从数组下标0开始，删除3个元素，并添加元素'zhz'
  console.log(b);										// ["zhz", 4, 5, 6, 7]
  let bb = b.splice(-2, 4, 'zhe');	// [6, 7]			从数组最后第二个元素开始，删除4个元素，并添加元素'zhe'
  console.log(b);										// ["zhz", 4, 5, "zhe"] 
  
  // 不删除只添加
  let c = [1, 2, 3, 4, 5, 6, 7];
  let ca = c.splice(1, 0, 'zhz');		// []					从数组最后第一个元素开始，不删除元素，只添加元素'zhz'
  console.log(c);										// [1, "zhz", 2, 3, 4, 5, 6, 7]
  let cb = c.splice(-3, 0, 'zhe');	// []
  console.log(c);										// [1, "zhz", 2, 3, 4, 'zhe', 5, 6, 7]
  ```

### 3.2、`arr.sort(() => {})`

* 【定义】 sort()方法对数组元素进行排序，并返回这个数组。

* 【参数】可选，规定排序顺序的比较函数。

  * 默认情况下sort()方法没有传比较函数的话，默认按字母升序；

    * 如果不是元素不是字符串的话，会调用`toString()`方法将元素转化为字符串的Unicode位点，然后再比较字符。

    ```js
    // 字符串排列 看起来很正常
    var a = ["Banana", "Orange", "Apple", "Mango"];
    a.sort(); 										// ["Apple","Banana","Mango","Orange"]
    
    // 数字排序的时候 因为转换成Unicode字符串之后，有些数字会比较大会排在后面 这显然不是我们想要的
    var	a = [10, 1, 3, 20,25,8];
    console.log(a.sort()) 				// [1,10,20,25,3,8];
    ```

  * 若有比较函数，sort的比较函数有两个默认参数，要在函数中接收这两个参数，这两个参数是数组中两个要比较的元素，通常我们用 a 和 b 接收两个将要比较的元素：

    - 若比较函数返回值 <0，那么 a 将排到 b 的前面;
    - 若比较函数返回值 =0，那么 a 和 b 相对位置不变；
    - 若比较函数返回值 >0，那么 b 排在a 将的前面；

  ```js
  // 1⃣️ 数组内数字，按照数字大小，升序、降序:
  	// 【升序】a-b < 0，a 将排到 b 前面；
  	// 【降序】a-b > 0，a 将排到 b 后面；
  var array =  [10, 1, 3, 4,20,4,25,8];
  array.sort(function(a,b){
    return a-b;
  });
  console.log(array); 			// [1,3,4,4,8,10,20,25];
  
  array.sort(function(a,b){
    return b-a;
  });
  console.log(array); 			// [25,20,10,8,4,4,3,1];
  
  
  // 2⃣️ 数组内对象，按照对象的属性值的大小，升序、降序
  var array = [{id:10,age:2},{id:5,age:4},{id:6,age:10},{id:9,age:6},{id:2,age:8},{id:10,age:9}];
  array.sort(function(a,b){
    if(a.id === b.id){		// 如果id的值相等，按照age的值降序
      return b.age - a.age
    }else{ 								// 如果id的值不相等，按照id的值升序
      return a.id - b.id
    }
  })
  //[{"id":2,"age":8},{"id":5,"age":4},{"id":6,"age":10},{"id":9,"age":6},{"id":10,"age":9},{"id":10,"age":2}] 
  
  // 3⃣️ 数组内对象，按照对象的属性值的内容，多条件排序
  var array = [{name:'zhz'},{name:'zhz'},{name:'OB'},{name:'zhz'},{name:'OB'},{name:'OB'}];
  array.sort(function(a,b){
    if(a.name === 'zhz'){		// 如果 name 是'zhz' 返回 -1，-1<0 a排在b的前面
      return -1
    }else{ 									// 如果不是的话，a排在b的后面
      return 1
    }
  })
  // [{"name":"zhz"},{"name":"zhz"},{"name":"zhz"},{"name":"OB"},{"name":"OB"},{"name":"OB"}] 
  ```

### 3.3、`arr.pop()`

### 3.4、`arr.shift()`

### 3.5、`arr.push()`

### 3.6、`arr.unshift()`

### 3.7、`arr.reverse()`

* 【定义】reverse() 方法用于颠倒数组中元素的顺序。

* 【参数】 无

  ```js
  let  a =  [1,2,3];
  a.reverse();  
  console.log(a); // [3,2,1]
  ```

### 3.8、ES6 `arr.copyWithin(target, start=0, end=this.length)` 

* 【参数】三个参数都是数值，如果不是，会自动转为数值：

  1. target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
  2. start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示倒数。
  3. end（可选）：到该位置前停止读取数据，默认等于数组长度。使用负数可从数组结尾处规定位置。

  ```js
  // -2相当于3号位，-1相当于4号位
  [1, 2, 3, 4, 5].copyWithin(0, -2, -1)
  // [4, 2, 3, 4, 5]
  
  // 第一个参数是开始被替换的元素位置
  // 要替换数据的位置范围:从第二个参数是开始读取的元素，在第三个参数前面一个元素停止读取
  // 数组的长度不会改变
  // 读了几个元素就从开始被替换的地方替换几个元素
  ```

### 3.9、ES6 `arr.fill()`

* 【定义】使用给定值，填充一个数组。

* 【参数】

  * 第一个元素(必须)：要填充数组的值
  * 第二个元素(可选)：填充的开始位置,默认值为0
  * 第三个元素(可选)：填充的结束位置，默认是为`this.length` 

  ```js
  [1, 2, 3].fill(99);									// [99, 99, 99]
  [1, 2, 3].fill(99).fill(0, 0, 1);		// [0, 99, 99]
  ```

## 4、♨️遍历方法🔟➕2⃣️个

>     【ES5】forEach、every、some、filter、map、reduce、reduceRight
>     【ES6】find、findIndex、keys、values、entries

### 4.1、`arr.forEach(function(currentValue, index, arr), thisValue)`

* 【定义】 按升序，为数组中含有效值的每一项执行一次回调函数。

* 【参数】
  * function(必须)：数组中每个元素需要调用的函数。
    1. currentValue(必须),数组当前元素的值
    2. index(可选), 当前元素的索引值
    3. arr(可选),数组对象本身
  * thisValue(可选):  当执行回调函数时this绑定对象的值，默认值为`undefined`

* 【单独⚠️】
  * 无法中途退出循环，只能用`return`退出本次回调，进行下一次回调。
* 【返回值】
  * 它总是返回 undefined值，即使你return了一个值。
* 【遍历方法统一⚠️】
  1. 对于空数组是不会执行回调函数的；
  2. 对于已在迭代过程中删除的元素，或者空元素会跳过回调函数；
  3. 遍历次数在第一次循环前就会确定，再添加到数组中的元素不会被遍历；
  4. 🤔️如果已经存在的值被改变，则传递给 callback 的值是遍历到他们那一刻的值；

```js
let a = [1, 2, ,3];											// 最后第二个元素是空的，不会遍历(undefined、null会遍历)
let obj = { name: 'zhz' };
// 回调函数也接受接头函数写法
let result = a.forEach(function (value, index, array) { 
  a[3] = '改变元素';
  a.push('添加到尾端，不会被遍历');
  console.log(value, 'function参数'); 	 // 分别打印 1, 2, 改变元素
  console.log(this.name);								// OBKoro1 打印三次 this绑定在obj对象上
  // break; 														// break会报错
  return value; 												// return只能结束本次回调，会执行下次回调
  console.log('不会执行')
}, obj);
console.log(result);										// 即使return了一个值,也还是返回undefined
```

### 4.2、`arr.every(function(currentValue, index, arr), thisValue)`

* 【定义】方法用于检测数组所有元素是否都符合函数定义的条件（所有数组项都满足）；
* 【参数】类似⬆️面的参数
* 【返回值】
  1. 如果数组中检测到**有一个元素不满足，则整个表达式返回 false**，且剩余的元素不会再进行检测。
  2. 如果所有元素**都满足条件，则返回 true**。
* 【遍历方法注意点⚠️】统一同上⬆️

```js
function isBigEnough(element, index, array) { 
  return element >= 10; 																// 判断数组中的所有元素是否都大于10
}
let result = [12, 5, 8, 130, 44].every(isBigEnough);   	// false
let result = [12, 54, 18, 130, 44].every(isBigEnough); 	// true

[12, 5, 8, 130, 44].every(x => x >= 10); 								// false	接受箭头函数写法 
[12, 54, 18, 130, 44].every(x => x >= 10); 							// true
```

### 4.3、`arr.some(function(currentValue, index, arr), thisValue)`

* 【定义】数组中的是否有满足判断条件的元素（有一个数组项满足即可）；
* 【参数】类似⬆️面的参数
* 【返回值】
  * 如果**有一个元素满足条件，则表达式返回true**，剩余的元素不会再执行检测。
  * 如果**没有满足条件的元素，则返回false**。

* 【遍历方法注意点⚠️】统一同上⬆️

```js
 function isBigEnough(element, index, array) {
   return (element >= 10); 													//数组中是否有一个元素大于 10
 }
 let result = [2, 5, 8, 1, 4].some(isBigEnough); 		// false
 let result = [12, 5, 8, 1, 4].some(isBigEnough); 	// true
```

### 4.4、`arr.filter(function(currentValue, index, arr), thisArg`

* 【定义】返回一个新数组, 其包含通过所提供函数实现的测试的所有元素。
* 【参数】类似⬆️面的参数
* 【返回值】
  * **返回一个新数组** ，其包含通过所提供函数实现的测试的所有元素（不改变原数组）。

* 【遍历方法注意点⚠️】统一同上⬆️

```js
let a = [32, 33, 16, 40];
let result = a.filter(function (value, index, array) {
  return value >= 18; 				// 返回a数组中所有大于18的元素
});
console.log(result, a);				// [32,33,40] [32,33,16,40]
```

### 4.5、`arr.map(function(currentValue, index, arr), thisArg)`

* 【定义】返回一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
* 【参数】类似⬆️面的参数
* 【返回值】
  * **返回一个新数组**，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

* 【遍历方法注意点⚠️】统一同上⬆️

```js
let a = ['1','2','3','4'];
let result = a.map(function (value, index, array) {
  return value + '新数组的新元素'
});

console.log(result, a); 
// ["1新数组的新元素","2新数组的新元素","3新数组的新元素","4新数组的新元素"] ["1","2","3","4"]
```

### 4.6、`arr.reduce(function(total, currentValue, currentIndex, arr), initialValue)`

* 【定义】reduce() 方法对累加器和数组中的每个元素（从左到右）应用一个函数，最终合并为一个值。
* 【参数】
  * function(必须)：数组中每个元素需要调用的函数。
    * total(必须)，初始值, 或者上一次调用回调返回的值
    2. currentValue(必须),数组当前元素的值
    * index(可选), 当前元素的索引值
    * arr(可选),数组对象本身
  * initialValue(可选)：指定第一次回调 的第一个参数。
* 【返回值】
  * 返回函数处理过后的一个值，或者一个数组

* 【⚠️回调第一次执行时】
  - 如果 initialValue 在调用 reduce 时被提供，那么第一个 total 将等于 initialValue，此时 currentValue 等于数组中的第一个值；
  - 如果 initialValue 未被提供，那么 total 等于数组中的第一个值，currentValue 等于数组中的第二个值。此时如果数组为空，那么将抛出 TypeError。
  - 如果数组仅有一个元素，并且没有提供 initialValue，或提供了 initialValue 但数组为空，那么回调不会被执行，数组的唯一值将被返回。

```js
// 1⃣️一维数组求和 
let sum = [0, 1, 2, 3].reduce(
  (a, b) => a + b,
  0
);
console.log(sum);					// 6

// 2⃣️二维数组转化为一维，将数组元素展开
let flattened = [[0, 1], [2, 3], [4, 5]].reduce(
  (a, b) => a.concat(b),
  []
);
console.log(flattened)		// [0, 1, 2, 3, 4, 5]
```

### 4.7、`arr.find(function(currentValue, index, arr), thisArg)`

* 【定义】用于找出第一个符合条件的数组成员，并返回该成员，如果没有符合条件的成员，则返回undefined。
* 【参数】类似⬆️面的参数
* 【返回值】
  * **返回第一个符合条件的数组成员**
* 【备注】
  * 可以识别`NaN`，弥补了`indexOf`的不足。

```js
let a = [1, 4, -5, 10].find((n) => n < 0); 									 // 返回元素-5
let b = [1, 4, -5, 10, NaN].find((n) => Object.is(NaN, n));  // 返回元素NaN
```

### 4.8、`arr.findIndex(function(currentValue, index, arr), thisArg)`

* 【定义】用于找出第一个符合条件的数组成员，并返回该成员，如果没有符合条件的成员，则返回undefined。
* 【参数】类似⬆️面的参数
* 【返回值】
  * **返回第一个符合条件的数组成员的下标**
* 【备注】
  * 可以识别`NaN`，弥补了`indexOf`的不足。

```js
let a = [1, 4, -5, 10].findIndex((n) => n < 0); 								 // 返回索引2
let b = [1, 4, -5, 10,NaN].findIndex((n) => Object.is(NaN, n));  // 返回索引4
```

### 4.9、`arr.keys();arr.values();arr.entries()` 

* 【定义】三个方法都返回一个新的 Array Iterator 对象，对象根据方法不同包含不同的值。
* 【参数】🈚️
* 【⚠️】在`for..of`中如果遍历中途要退出，可以使用`break`退出循环。

```js
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```

