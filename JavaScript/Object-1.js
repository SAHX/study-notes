/**
 * 对象
 */
var Person = {
    _age:26,
    z_age:27 // 周岁
};

// 对象的数据属性
Object.defineProperty(Person,'name',{
    configurable: true,
    enumerable: true,
    writable: false, // name属性只读
    value:'SAHX'
})

// 对象的访问器属性
Object.defineProperty(Person,"age",{
    configurable: true,
    enumerable: true,
    get:function(){
        console.log('获取名字')
        return this.z_age // 获取的年龄为周岁
    },
    set:function(newAge){
        console.log('设置名字')
        this._age = newAge
        this.z_age = newAge + 1 // 周岁 = 年龄 + 1
    }
})

/**
 * 构造函数创建对象
 */

function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function () {
        console.log(this.name)
    }
}
var person_1 = new Person('SAHX',26,'enginer')
