#### 解剖Promise内部结构，一步一步实现一个完整的Promise

###### Promise标准解读
- 只有一个then方法，没有catch，race，all等方法，甚至没有构造函数

Promise标准中仅指定了Promise对象的then方法的行为，其它一切我们常见的方法/函数都并没有指定，包括catch，race，all等常用方法，甚至也没有指定该如何构造出一个Promise对象，另外then也没有一般实现中（Q, $q等）所支持的第三个参数，一般称onProgress

- then方法返回一个新的Promise

Promise的then方法返回一个新的Promise，而不是返回this，此处在下文会有更多解释

promise2 = promise1.then(alert)
promise2 != promise1 // true

- 不同Promise的实现需要可以相互调用(interoperable)

- Promise的初始状态为pending，它可以由此状态转换为fulfilled（本文为了一致把此状态叫做resolved）或者rejected，一旦状态确定，就不可以再次转换为其它状态，状态确定的过程称为settle


- [Promises/A+标准](https://promisesaplus.com/)


###### 实现Promise

**构造函数**
因为标准并没有指定如何构造一个`Promise`对象，所以我们同样以目前一般`Promise`实现中通用的方法来构造一个`Promise`对象，也是ES6原生`Promise`里所使用的方式，即：
```javascript
// Promise构造函数接收一个executor函数，executor函数执行完同步或异步操作后，调用它的两个参数resolve和reject
var promise = new Promise(function(resolve, reject) {
  /*
    如果操作成功，调用resolve并传入value
    如果操作失败，调用reject并传入reason
  */
})
```
我们先实现构造函数的框架如下：
```javascript
function Promise(executor) {
  var self = this
  self.status = 'pending' // Promise当前的状态
  self.data = undefined  // Promise的值
  self.onResolvedCallback = [] // Promise resolve时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面
  self.onRejectedCallback = [] // Promise reject时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面

  executor(resolve, reject) // 执行executor并传入相应的参数
}
```

上面的代码基本实现了`Promise`构造函数的主体，但目前还有两个问题：

我们给`executor`函数传了两个参数：`resolve`和`reject`，这两个参数目前还没有定义

`executor`有可能会出错（throw），类似下面这样，而如果`executor`出错，`Promise`应该被其`throw`出的值`reject`：

```javascript
new Promise(function(resolve, reject) {
  throw 2
})
```
所以我们需要在构造函数里定义resolve和reject这两个函数：

```javascript
function Promise(executor) {
  var self = this
  self.status = 'pending' // Promise当前的状态
  self.data = undefined  // Promise的值
  self.onResolvedCallback = [] // Promise resolve时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面
  self.onRejectedCallback = [] // Promise reject时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面

  function resolve(value) {
    // TODO
  }

  function reject(reason) {
    // TODO
  }

  try { // 考虑到执行executor的过程中有可能出错，所以我们用try/catch块给包起来，并且在出错后以catch到的值reject掉这个Promise
    executor(resolve, reject) // 执行executor
  } catch(e) {
    reject(e)
  }
}
```
有人可能会问，`resolve`和`reject`这两个函数能不能不定义在构造函数里呢？考虑到我们在`executor`函数里是以`resolve(value)`，`reject(reason)`的形式调用的这两个函数，而不是以`resolve.call(promise, value)`，`reject.call(promise, reason)`这种形式调用的，所以这两个函数在调用时的内部也必然有一个隐含的this，也就是说，要么这两个函数是经过bind后传给了executor，要么它们定义在构造函数的内部，使用self来访问所属的Promise对象。所以如果我们想把这两个函数定义在构造函数的外部，确实是可以这么写的：
```javascript
function resolve() {
  // TODO
}
function reject() {
  // TODO
}
function Promise(executor) {
  try {
    executor(resolve.bind(this), reject.bind(this))
  } catch(e) {
    reject.bind(this)(e)
  }
}
```

但是众所周知，bind也会返回一个新的函数，这么一来还是相当于每个`Promise`对象都有一对属于自己的`resolve`和`reject`函数，就跟写在构造函数内部没什么区别了，所以我们就直接把这两个函数定义在构造函数里面了。不过话说回来，如果浏览器对bind的所优化，使用后一种形式应该可以提升一下内存使用效率。

另外我们这里的实现并没有考虑隐藏this上的变量，这使得这个Promise的状态可以在executor函数外部被改变，在一个靠谱的实现里，构造出的Promise对象的状态和最终结果应当是无法从外部更改的。

接下来，我们实现resolve和reject这两个函数

```javascript
function Promise(executor) {
  // ...

  function resolve(value) {
    if (self.status === 'pending') {
      self.status = 'resolved'
      self.data = value
      for(var i = 0; i < self.onResolvedCallback.length; i++) {
        self.onResolvedCallback[i](value)
      }
    }
  }

  function reject(reason) {
    if (self.status === 'pending') {
      self.status = 'rejected'
      self.data = reason
      for(var i = 0; i < self.onRejectedCallback.length; i++) {
        self.onRejectedCallback[i](reason)
      }
    }
  }

  // ...
}
```


[剖析Promise内部结构，一步一步实现一个完整的、能通过所有Test case的Promise类 ](https://github.com/xieranmaya/blog/issues/3)
