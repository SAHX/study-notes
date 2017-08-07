### 一、工厂模式

```javascript
function createPerson(name,age,job){
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function(){
		alert(this.name);
	}
	return o;
}

var person1 = createPerson('luce',26,'software engineer')
```

##### 工厂模式的缺点：
没法解决对象识别的问题（即怎样知道一个对象的类型）

### 二、构造函数模式

> 1.  函数名使用大写字母
> 2. *以这种方式定义的构造函数是定义在Global对象（在浏览器中是window对象）中的。*

```javascript
// Person 为构造函数
function Person(name,age,job){
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = function(){
		alert(this.name)
	};
}

var person1 = new Person('luce',25,'doctor')
```

*new*操作符，以这种方式调用构造函数会经历以下4个步骤：
1. 创建一个新的对象；
2. 将构造函数的作用域赋给新对象（因此this就指向了这个新对象）；
3. 执行构造函数的代码（为这个新对象添加属性）；
4. 返回新对象。

对象person1有一个constructor（构造函数）属性，该属性指向Person

`console.log(person1.constructor == Person)  // true`

对象的constructor属性最初是用来标识对象类型的，检测对象类型使用 instanceof 操作符：

`console.log(person1 instanceof Person)  // true`

创建自定义的构造函数意味着将来可以将它的实例标识为一种特定的类型，而这正是构造函数模式胜过工厂模式的地方。

所有对象均继承自Object，所以：

`console.log(person1 instanceof Object)  //true`

构造函数与其他函数的唯一区别，就在于调用它们的方式不同。构造函数也是函数，不存在定义构造函数的特殊语法。任何函数，只要通过new操作符来调用，那它就可以作为构造函数；而任何函数，如果不通过new操作符来调用，那它跟普通的函数没有什么两样。

##### 构造函数模式的缺点：
每个方法都要在每个实例上重新创建一遍，不同实例上的同名函数是不相等的。可以通过把函数定义转义到构造函数外部解决这个问题：
```javascript
function Person(name,age,job){
    this.name = name;
    this.age = age;
    this.sayName = sayName;
}

function sayName(){
    console.log(this.name)
}
var person1 = new Person('Tom',23,'Engineer')
var person2 = new Person('june',25,'Doctor')
```