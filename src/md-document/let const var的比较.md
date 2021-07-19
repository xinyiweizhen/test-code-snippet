## `let const var`的比较

（1）作用域

 `var` 声明的变量的作用域是它当前的执行上下文，即如果是在任何函数外面，则是全局执行上下文，如果在函数里面，则是当前函数执行上下文。换句话说，`var` 声明的变量的作用域只能是全局或者整个函数块的。

`let` 声明的变量的作用域则是它当前所处代码块，即它的作用域既可以是全局或者整个函数块，也可以是 `if、while、switch`等用`{}`限定的代码块。

```javascript
function varTest() {
  var a = 1;

  {
    var a = 2; // 函数块中，同一个变量
    console.log(a); // 2
  }

  console.log(a); // 2
}

function letTest() {
  let a = 1;

  {
    let a = 2; // 代码块中，新的变量
    console.log(a); // 2
  }

  console.log(a); // 1
}

varTest();
letTest();
```



（2）重复声明

`var `允许在同一作用域中重复声明，而` let `不允许在同一作用域中重复声明，否则将抛出异常。

```javascript
var a = 1;
var a = 2;

console.log(a) // 2

function test() {
  var a = 3;
  var a = 4;
  console.log(a) // 4
}

test()


if(false) {
  let a = 1;
  let a = 2; // SyntaxError: Identifier 'a' has already been declared
}

switch(index) {
  case 0:
    let a = 1;
  break;

  default:
    let a = 2; // SyntaxError: Identifier 'a' has already been declared
    break;
}
```



（3）绑定全局对象

`var `在全局环境声明变量，会在全局对象里新建一个属性，而 `let `在全局环境声明变量，则不会在全局对象里新建一个属性。

```javascript
var foo = 'global'
let bar = 'global'

console.log(this.foo) // global
console.log(this.bar) // undefined
```

（4）变量提升与暂存死区

`var` 声明变量会存在变量提升, 如何理解变量提升呢？

要解释清楚这个，就要涉及到[执行上下文](https://www.cnblogs.com/TomXu/archive/2012/01/13/2308101.html)和[变量对象](https://www.cnblogs.com/TomXu/archive/2012/01/16/2309728.html)。

在 JavaScript 代码运行时，解释执行全局代码、调用函数或使用 eval 函数执行一个字符串表达式都会创建并进入一个新的执行环境，而这个执行环境被称之为执行上下文。因此执行上下文有三类：全局执行上下文、函数执行上下文、eval 函数执行上下文。

执行上下文可以理解为一个抽象的对象，如下图：

![执行上下文](https://raw.githubusercontent.com/xinyiweizhen/ImageGallery/main/blog_img/20210324160013.png)

> 名词解释：
>
> Variable object：变量对象，用于存储被定义在执行上下文中的变量 (variables) 和函数声明 (function declarations) 。
>
> Scope chain：作用域链，是一个对象列表 (list of objects) ，用以检索上下文代码中出现的标识符 (identifiers) 。
>
> thisValue：this 指针，是一个与执行上下文相关的特殊对象，也被称之为上下文对象。

一个执行上下文的生命周期可以分为三个阶段：创建、执行、释放。如下图：

![执行上下文的生命周期](https://raw.githubusercontent.com/xinyiweizhen/ImageGallery/main/blog_img/20210324160310.png)

而所有使用` var` 声明的变量都会在执行上下文的**创建阶段**时作为变量对象的属性被创建并初始化，这样才能保证在执行阶段能通过标识符在变量对象里找到对应变量进行赋值操作等。

而用 `var `声明的变量构建变量对象时进行的操作如下：

- 由名称和对应值（`undefined`）组成一个**变量对象**的属性被创建（创建并初始化）
- 如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性。

上述过程就是我们所谓的**“变量提升”**，这也就能解释为什么变量可以在声明之前使用，因为使用是在**执行阶段**，而在此之前的创建阶段就已经将声明的变量添加到了变量对象中，所以执行阶段通过标识符可以在变量对象中查找到，也就不会报错。

`let `声明变量存在暂存死区，如何理解暂存死区呢？

**其实` let` 也存在与 `var` 类似的“变量提升”过程**，但与 var 不同的是其在执行上下文的创建阶段，只会创建变量而不会被初始化（undefined），并且 ES6 规定了其初始化过程是在执行上下文的执行阶段（即直到它们的定义被执行时才初始化），使用未被初始化的变量将会报错。

>`let` and `const` declarations define variables that are scoped to [the running execution context](http://www.ecma-international.org/ecma-262/6.0/#sec-execution-contexts)’s [LexicalEnvironment](http://www.ecma-international.org/ecma-262/6.0/#sec-execution-contexts). The variables are created when their containing [Lexical Environment](http://www.ecma-international.org/ecma-262/6.0/#sec-lexical-environments) is instantiated but may not be accessed in any way until the variable’s *LexicalBinding* is evaluated. A variable defined by a *LexicalBinding* with an *Initializer* is assigned the value of its *Initializer*’s *AssignmentExpression* when the *LexicalBinding* is evaluated, not when the variable is created. If a *LexicalBinding* in a `let` declaration does not have an *Initializer* the variable is assigned the value **undefined** when the *LexicalBinding* is evaluated.

在变量初始化前访问该变量会导致 `ReferenceError`，因此从进入作用域创建变量，到变量开始可被访问的一段时间（过程），就称为**暂存死区(Temporal Dead Zone)**。

```javascript
console.log(bar); // undefined
console.log(foo); // ReferenceError: foo is not defined

var bar = 1;
let foo = 2;
```

**注：首先，需要分清变量的创建、初始化、赋值是三个不同的过程。另外，从 ES5 开始用词法环境（Lexical Environment）替代了 ES3 中的变量对象（Variable object）来管理静态作用域，但作用是相同的。为了方便理解，上述讲解中仍保留使用变量对象来进行描述。**

**小结**

1. `var` 声明的变量在执行上下文创建阶段就会被「创建」和「初始化」，因此对于执行阶段来说，可以在声明之前使用。
2. `let` 声明的变量在执行上下文创建阶段只会被「创建」而不会被「初始化」，因此对于执行阶段来说，如果在其定义执行前使用，相当于使用了未被初始化的变量，会报错。

`const` 与 `let `很类似，都具有上面提到的` let `的特性，唯一区别就在于` const `声明的是一个只读变量，声明之后不允许改变其值。因此，`const` 一旦声明必须初始化，否则会报错。

**如何理解声明之后不允许改变其值？**

其实` const `其实保证的不是变量的值不变，而是保证变量指向的内存地址所保存的数据不允许改动（即栈内存在的值和地址）。

JavaScript 的数据类型分为两类：原始值类型和对象（Object类型）。

对于原始值类型（undefined、null、true/false、number、string），值就保存在变量指向的那个内存地址（在栈中），因此` const `声明的原始值类型变量等同于常量。

对于对象类型（object，array，function等），变量指向的内存地址其实是保存了一个指向实际数据的指针，所以` const `只能保证指针是不可修改的，至于指针指向的数据结构是无法保证其不能被修改的（在堆中）。

```javascript
let a;
const b = "constant"

a = "variable"
b = 'change' // TypeError: Assignment to constant variable

const obj = {
  value: 1
}

obj.value = 2

console.log(obj) // { value: 2 }

obj = {} // TypeError: Assignment to constant variable
```



参考：[[深入理解JS：var、let、const的异同](https://www.cnblogs.com/forcheng/p/13033976.html)](https://www.cnblogs.com/forcheng/p/13033976.html)

