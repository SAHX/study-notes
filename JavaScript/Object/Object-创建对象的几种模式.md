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
每个方法都要在每个实例上重新创建一遍，不同实例上的同名函数是不相等的。可以通过把函数定义转移到构造函数外部解决这个问题：
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

### 原型模式
我们创建的每个函数都有一个prototype（原型）属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。大白话就是，prototype就是通过调用构造函数而创建的那个对象实例的原型对象，这个原型对象让所有使用该构造函数创建的对象实例共享它的属性和方法。

这样的话，就不必在构造函数中定义对象实例的信息，而是直接将这些信息直接添加到原型对象中：
```javascript
function Person(){}

Person.prototype.name = 'Nuce';
Person.prototype.age = 24;
Person.prototype.sayName = function(){
    console.log(this.name)
};

var person1 = new Person();
person1.sayName(); //"Nuce"

var person2 = new Person();
person2.sayName(); //"Nuce"

console.log(person1.sayName == person2.sayName) //true
```
#### 1. 理解原型对象
在创建一个新函数时，会根据一组特定的规则为该函数创建一个prototype属性，这个属性指向函数的原型对象。在默认情况下，所有原型对象都会自动获得一个constructor（构造函数）属性，这个属性包含一个指向prototype属性所在函数的指针。

创建了自定义的构造函数之后，其原型对象默认只会取得constructor属性；至于其他方法，则都从Object继承而来。当调用构造函数创建一个新实例后，该实例的内部将包含一个指针（内部属性），指向构造函数的原型对象。

<div style="text-align:center">
    <img src="./prototype.png" width="500">
</div>

该图展示了Person构造函数、Person的原型属性以及Person现有的两个实例之间的关系。在此，Person.prototype指向了原型对象，而Person.prototype.constructor又指回了Person。Person的每个实例———person1和person2都包含一个内部属性，该属性仅仅指向了Person.prototype；换句话说，它们与构造函数没有直接的关系。此外，要格外注意的是，虽然这两个实例都不包含属性和方法，但我们却可以调用person1.sayName(),这是通过查找对象属性的过程来实现的。

可以通过Object.getPrototypeOf()来获取实例中的内部属性[[Prototype]]:
```
console.log(Object.getPrototypeOf(person1) == Person.prototype); // true

console.log(Object.getPrototypeOf(person1).name); //"Nicholas"
```

虽然可以通过对象实例访问保存在原型中的值，但是却不能通过对象实例重写原型中的值。如果我们在实例中添加了一个属性，而该属性与实例原型中的一个属性同名，那我们就在实例中创建该属性，该属性将会屏蔽原型中的那个属性。

使用delete操作符可以完全删除实例属性，从而让我们能够重新访问原型中的属性

使用hasOwnProperty()方法可以检测一个属性是存在于实例中，还是存在于原型中。
```javascript
console.log(person1.hasOwnProperty('name')); //false
```

#### 2. 原型于 in 操作符
有两种方式使用 in 操作符：单独使用和在 for-in 循环中使用。在单独使用时，in 操作符会在通过对象能够访问给定属性时返回 true，无论该属性存在于实例中还是原型中。在使用 for-in 循环是，返回的是所有能够通过对象访问的、可枚举的属性，其中既包括存在于实例中的属性，也包括存在于原型中的属性。

要取得对象上所有可枚举的*实例属性*，可以使用Object.keys()方法。这个方法接收一个对象作为参数，返回一个包含所有可枚举属性的字符串数组。