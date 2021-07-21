该文件夹主要是redux相关的知识点和案例代码

#### 概念
##### Redux
###### Redux 是什么？

[Redux](https://cn.redux.js.org/) 是 JavaScript 应用的状态容器，提供可预测的状态管理。

###### 你需要使用 Redux 吗 或者是 Redux 的应用场景？
虽然 Redux 是一个很有加载的管理状态工具，但还是要考虑下它是否适合你的场景。不要仅仅因为有人说过应该使用 Redux 而使用 - 应该花一些时间来了解使用它的潜在好处和取舍。

当遇到如下问题时，建议开始使用 Redux：

- 你有很多数据随时间而变化 (**组件通讯**)
- 你希望状态有一个唯一确定的来源（single source of truth）(**共享**)
- 你发现将所有状态放在顶层组件中管理已不可维护

面对这种左右为难的纠结状况，这里有一套步骤，可以帮助开发者决定如何防止应用状态。

第一步，看这个状态是否会被多个 React 组件共享。

所谓共享，就是多个组件需要读取或者修改这个状态，如果是，那不用多想，应该放在 Store 上，因为 Store 上状态方便被多个组件共用，避免组件之间传递数据；如果不是，继续看第二步。

第二步，看这个组件被 unmount 之后重新被 mount，之前的状态是否需要保留。

举个简单例子，一个对话框组件。用户在对话框打开的时候输入了一些内容，不做提交直接关闭这个对话框，这时候对话框就被 unmount 了，然后重新打开这个对话框（也就是重新 mount），需求是否要求刚才输入的内容依然显示？如果是，那么应该把状态放在 Store 上，因为 React 组件在 unmount 之后其中的状态也随之消失了，要想在重新 mount 时重获之前的状态，只能把状态放在组件之外，Store 当然是一个好的选择；如果需求不要求重新 mount 时保持 unmount 之前的状态，继续看第三步。

第三步，到这一步，基本上可以确定，这个状态可以放在 React 组件中了。

不过，如果你觉得这个状态很复杂，需要跟踪修改过程，那看你个人喜好，可以选择放在 Store 上；如果你想简单处理，可以心安理得地让这个状态由 React 组件自己管理。


> 有关如何使用Redux的更多想法，请参见：
>
> - [Redux FAQ: 为什么要用 Redux？](https://cn.redux.js.org/faq/general#when-should-i-use-redux)
> - [You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)
> - [Redux 之道，Part 1 - 实现和目的](https://blog.isquaredsoftware.com/2017/05/idiomatic-redux-tao-of-redux-part-1/)
> - [Redux 之道，Part 2 - 实践和原理](https://blog.isquaredsoftware.com/2017/05/idiomatic-redux-tao-of-redux-part-2/)
> - [Redux 常见问题](https://cn.redux.js.org/faq)


###### Redux工作流程
![Redux工作流程](./img/redux原理图.png)

###### redux的三个核心概念
**action**:

`action` 就是一个普通 JavaScript 对象, 就是描述发生了什么的指示器，表示一个动作。
```
{ type: 'ADD_TODO', text: 'Go to swimming pool' }
{ type: 'TOGGLE_TODO', index: 1 }
{ type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL' }
```
`action` 包含2个属性
- type：标识属性, 值为字符串, 唯一, 必要属性

- data(也叫`payload`)：数据属性, 值类型任意, 可选属性

**reducer**：

`reducer` 只是一个接收 `state` 和 `action`，并返回新的 `state` 的函数。

根据旧的`state`和`action`， 产生新的`state`，是一个纯函数
```javascript
function visibilityFilter(state = 'SHOW_ALL', action) {
  if (action.type === 'SET_VISIBILITY_FILTER') {
    return action.filter
  } else {
    return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([{ text: action.text, completed: false }])
    case 'TOGGLE_TODO':
      return state.map((todo, index) =>
        action.index === index
          ? { text: todo.text, completed: !todo.completed }
          : todo
      )
    default:
      return state
  }
}
```

**store**:

将`state`、`action`、`reducer`联系在一起的对象。

`store` 的作用就是储存 `state`，并且监听其变化。

如何得到一个 `store` 对象？

```javascript
import { createStore } from 'redux'

//这里的 reducers 就是刚才的 Reducer 函数
let store = createStore(reducer);
```

该 `store` 对象有什么用？

- `getState()` :  得到`store`中的`state`。
- `dispatch(action)`: 分发`action`, 触发`reducer`调用, 产生新的`state`。
- `subscribe(listener)`: 注册监听, 当产生了新的`state`时, 自动调用。

###### Redux相关核心API
- [`createStore(reducer, [preloadedState], [enhancer])`](https://cn.redux.js.org/api/createstore)

    作用：创建包含指定reducer的store对象
    ```javascript
      import { createStore } from 'redux'
      
      function todos(state = [], action) {
        switch (action.type) {
          case 'ADD_TODO':
            return state.concat([action.text])
          default:
            return state
        }
      }
      
      let store = createStore(todos)
      
      store.dispatch({
        type: 'ADD_TODO',
        text: 'Read the docs'
      })
      
      console.log(store.getState())
    ```
- [`Store`](https://cn.redux.js.org/api/store)

    Store 就是用来维持应用所有的 state 树 的一个对象。 改变 store 内 state 的惟一途径是对它 dispatch 一个 action。
    
    Store 不是类。它只是有几个方法的对象。 要创建它，只需要把根部的 reducing 函数 传递给 createStore。
    
    Store 方法:
    
     [`getState()`](https://cn.redux.js.org/api/store#getstate)
     返回应用当前的 state 树。它与 store 的最后一个 reducer 返回值相同。
    
     [`dispatch(action)`](https://cn.redux.js.org/api/store#dispatchaction)
     分发 action。这是触发 state 变化的惟一途径。
    
     [`subscribe(listener)`](https://cn.redux.js.org/api/store#subscribelistener)
     添加一个变化监听器。每当 dispatch action 的时候就会执行，state 树中的一部分可能已经变化。你可以在回调函数里调用 getState() 来拿到当前 state。
    
     [`replaceReducer(nextReducer)`](https://cn.redux.js.org/api/store#replacereducernextreducer)
     替换 store 当前用来计算 state 的 reducer。
    
    ```javascript
    import { createStore } from 'redux'
    const store = createStore(todos)
    
    function addTodo(text) {
      return {
        type: 'ADD_TODO',
        text
      }
    }
    store.getState()
    store.dispatch(addTodo('Read the docs'))
    store.subscribe(render)
    ```
    
- [`combineReducers(reducers)`](https://cn.redux.js.org/api/combinereducers)
  
    combineReducers 辅助函数的作用是，把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore 方法。
    
    合并后的 reducer 可以调用各个子 reducer，并把它们返回的结果合并成一个 state 对象。 由 combineReducers() 返回的 state 对象，会将传入的每个 reducer 返回的 state 按其传递给 combineReducers() 时对应的 key 进行命名。
    
    通过为传入对象的 reducer 命名不同的 key 来控制返回 state key 的命名。例如，你可以调用 combineReducers({ todos: myTodosReducer, counter: myCounterReducer }) 将 state 结构变为 { todos, counter }。
    
    通常的做法是命名 reducer，然后 state 再去分割那些信息，这样你可以使用 ES6 的简写方法：combineReducers({ counter, todos })。这与 combineReducers({ counter: counter, todos: todos }) 是等价的。
    ```javascript
    // reducers/todos.js
    export default function todos(state = [], action) {
      switch (action.type) {
        case 'ADD_TODO':
          return state.concat([action.text])
        default:
          return state
      }
    }
    // reducers/counter.js
    export default function counter(state = 0, action) {
      switch (action.type) {
        case 'INCREMENT':
          return state + 1
        case 'DECREMENT':
          return state - 1
        default:
          return state
      }
    }
    // reducers/index.js
    import { combineReducers } from 'redux'
    import todos from './todos'
    import counter from './counter'
    
    export default combineReducers({
      todos,
      counter
    })
    // App.js
    import { createStore } from 'redux'
    import reducer from './reducers/index'
    
    let store = createStore(reducer)
    console.log(store.getState())
    // {
    //   counter: 0,
    //   todos: []
    // }
    
    store.dispatch({
      type: 'ADD_TODO',
      text: 'Use Redux'
    })
    console.log(store.getState())
    // {
    //   counter: 0,
    //   todos: [ 'Use Redux' ]
    // }
    ```


- [`applyMiddleware(...middleware)`](https://cn.redux.js.org/api/applymiddleware)

    使用包含自定义功能的 middleware 来扩展 Redux 是一种推荐的方式。
    ```javascript
    import { createStore, applyMiddleware } from 'redux'
    import todos from './reducers'
    
    function logger({ getState }) {
      return next => action => {
        console.log('will dispatch', action)
    
        // 调用 middleware 链中下一个 middleware 的 dispatch。
        const returnValue = next(action)
    
        console.log('state after dispatch', getState())
    
        // 一般会是 actions 本身，除非
        // 后面的 middleware 修改了它。
        return returnValue
      }
    }
    
    const store = createStore(todos, ['Use Redux'], applyMiddleware(logger))
    
    store.dispatch({
      type: 'ADD_TODO',
      text: 'Understand the middleware'
    })
    // (将打印如下信息:)
    // will dispatch: { type: 'ADD_TODO', text: 'Understand the middleware' }
    // state after dispatch: [ 'Use Redux', 'Understand the middleware' ]
    ```


###### 如何在 React 中使用 Redux ？
1. 安装 Redux
```shell script
npm i redux
```
2. 编写 reducer
```javascript
// count_reducer.js
const initState = 0;

export default function countReducer(state = initState, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state
    }
}
```
3. 编写 reducer 对应的 action。（其实也可以不用单独封装action）
```javascript
// constant.js
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
// count_action.js
import {INCREMENT, DECREMENT} from "../reducers/constant";

//同步action，就是指action的值为Object类型的一般对象
export const increment = data => ({type:INCREMENT,data})
export const decrement = data => ({type:DECREMENT,data})
```
4. 编写将action、reducer 联系起来的 store
```javascript
import {createStore } from 'redux'
import countReducer from "./reducers/count_reducer";

//暴露store 
export default createStore(countReducer)
```
5. 在React中将redux 联系起来, 监听 state 的变化。
```javascript
// Count.js
import React from 'react'
// 引入store
import store from './store'
// 引入action
import { inc, dec } from './store/actions/count_action'

const Count = ()=>{
    //  等于 count_reducer.js 中的initState
    console.log(store.getState());

    const increment = ()=>{
        // 等效于 store.dispatch({type: INCREMENT, data: 1})
        store.dispatch(inc(1))
    }

    const decrement = ()=>{
        // 等效于 store.dispatch({type: DECREMENT, data: 1})
        store.dispatch(dec(1))
    }

    return(
        <div>
            {/* 获取store中的 state */}
            <h1>当前求和为：{store.getState()}</h1>

            <button onClick={increment}>+1</button>&nbsp;
            <button onClick={decrement}>-1</button>&nbsp;
        </div>
    )
}

export default Count

// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Count from "./Count";

import store from './store'

const render = ()=> ReactDOM.render(
  <React.StrictMode>
    <Count />
  </React.StrictMode>,
  document.getElementById('root')
);

render()

// 添加一个变化监听器
store.subscribe(render)

```
###### 什么是同步 action 和异步 action ? 怎么使用异步 action

Redux自身只支持同步的数据处理，一个action从被dispatch处理，一路同步引发reducer被调用，然后同步更新store上的state，再同步引发视图的更新（不过视图虽然被同步触发，但并不一定要同步更新，这在Redux的控制之外）

Action 发出以后，Reducer 立即算出 State，这叫做同步；Action 发出以后，过一段时间再执行 Reducer，这就是异步。

比如说 触发 reducer 的时候是这样的

```store.dispatch({type:"getXXXX"})```

但是异步 action 却是这么调用
```
store.dispatch(dispatch=>{

    fetch("XXXXX").then(res=>{
        dispatch({type:"getXXX"})
    })
})
```

简单来说就是，同步action 就是一个普通对象，而异步action 是一个函数

[How to dispatch a Redux action with a timeout](https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559)

[Why do we need middleware for async flow in Redux](https://stackoverflow.com/questions/34570758/why-do-we-need-middleware-for-async-flow-in-redux/34599594#34599594)

比如上面的 Count 案例， 我们也可以在组件内使用异步来包裹 dispatch, 形成异步的 action 
```javascript
import { inc } from './store/actions/count_action'

//异步加
const incrementAsync = ()=>{
    const {value} = this.selectNumber
    setTimeout(()=>{
        // store.dispatch({type: INCREMENT, data: 1})
        store.dispatch(inc(1))
    },500)
}
```
但这种简单的异步解决方法在应用变得复杂的时候，并不能满足需求，反而会使 action 变得十分混乱。

那有比较好的解决方式吗？

当我们引入异步逻辑时，我们添加了一个额外的步骤，中间件可以运行像 AJAX 请求这样的逻辑，然后 dispatch action。这使得异步数据流看起来像这样：

![Redux 中间件](https://cn.redux.js.org/assets/images/ReduxAsyncDataFlowDiagram-d97ff38a0f4da0f327163170ccc13e80.gif)

引入redux-thunk 中间件
1. 安装 redux-thunk 依赖
```shell script
npm i redux-thunk
```
2. 在store 引用中间件
```javascript
import {createStore, applyMiddleware } from 'redux'
// 引入redux-thunk，用于支持异步action
import thunk from "redux-thunk";
import countReducer from "./reducers/count_reducer";

//暴露store, 引用中间件
export default createStore(countReducer, applyMiddleware(thunk))
```
3. 写异步的 action
```javascript
// 
// 异步action
export const incAsync = (data, time)=>{
    return (dispatch, getState)=>{
        setTimeout(()=>{
            dispatch(inc(data))
        }, time)
    }
}
```
4. 在组件中使用异步 action
```javascript
// Count.js
//异步加
const incrementAsync = ()=>{
    store.dispatch(incAsync(1, 1000))
}
```

`redux-thunk`做了什么？

1、redux-thunk 重写了 store.dispatch

2、并且内部保存了 原来的 store.dispatch

3、当你调用了 store.dispatch 的时候

4、通过判断你 调用 dispatch 传入的参数类型来判断要进行什么操作

5、当你传入的是函数，那么就执行你传入的函数，并把 重写后的 dispatch 继续传给你，让你可以继续套娃

6、当你传入的是对象，那么就直接调用 原dispatch，然后传入的你对象，完成 reducer 操作

更多参考资料：

[Redux 入门教程（二）：中间件与异步操作](https://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html)

[Redux的全家桶与最佳实践](https://zhuanlan.zhihu.com/p/22405838)

[Redux 异步action的内部实现](https://zhuanlan.zhihu.com/p/119633755)




##### [React-Redux](https://react-redux.js.org/introduction/getting-started)
###### React-Redux 干啥的？

React Redux是Redux的官方React UI绑定层。它允许React组件从Redux存储读取数据，并向存储发送操作来更新状态。

这个库是可以选用的。实际项目中，你应该权衡一下，是直接使用 Redux，还是使用 React-Redux。后者虽然提供了便利，但是需要掌握额外的 API，并且要遵守它的组件拆分规范。

###### React-Redux 模型图
![React-Redux](./img/react-redux模型图.png)

弄清两个概念，React-Redux 将所有组件分成两大类， UI组件和容器组件

UI组件：

- 只负责 UI 的呈现，不带有任何业务逻辑
- 没有状态（即不使用`this.state`这个变量）
- 所有数据都由参数（`this.props`）提供（一般数据和函数）
- 不使用任何 Redux 的 API

容器组件：

- 负责管理数据和业务逻辑，不负责 UI 的呈现
- 带有内部状态
- 使用 Redux 的 API

总之，只要记住一句话就可以了：UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑。

所有的 UI 组件都由用户提供，容器组件则是由 React-Redux 自动生成。

###### React-Redux相关API

- **[`<Provider> `组件（容器组件）](https://react-redux.js.org/api/provider)**

  `connect`方法生成容器组件以后，需要让容器组件拿到`state`对象，才能生成 UI 组件的参数。

  一种解决方法是将`state`对象作为props参数，传入容器组件。但是，这样做比较麻烦，尤其是容器组件可能在很深的层级，一级级将`state`传下去就很麻烦。

  React-Redux 提供`Provider`组件，可以让容器组件拿到`state`

  ```react
  import React from 'react'
  import ReactDOM from 'react-dom'
  import { Provider } from 'react-redux'
  
  import { App } from './App'
  import createStore from './createReduxStore'
  
  const store = createStore()
  
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
  ```

  它的原理是`React`组件的[`context`](https://facebook.github.io/react/docs/context.html)属性，请看源码：

  ```javascript
  class Provider extends Component {
    getChildContext() {
      return {
        store: this.props.store
      };
    }
    render() {
      return this.props.children;
    }
  }
  
  Provider.childContextTypes = {
    store: React.PropTypes.object
  }
  ```

  

- **[connect()](https://react-redux.js.org/api/connect)**

  React-Redux 提供`connect`方法，用于将React组件连接到Redux存储。`connect`单词的意思，就是将这两种组件连起来的意思。

  ```javascript
  import { connect } from 'react-redux'
  const VisibleTodoList = connect()(App);
  
  // 完整的api如下
  const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
  )(TodoList)
  ```

  `connect`方法接受4个可选参数：`mapStateToProps`、`mapDispatchToProps`、`mergeProps`和`options`。开发中常用的就是`mapStateToProps`和`mapDispatchToProps`，它们定义了 UI 组件的业务逻辑。`mapStateToProps`负责输入逻辑，即将`state`映射到 UI 组件的参数（`props`），`mapDispatchToProps`负责输出逻辑，即将用户对 UI 组件的操作映射成 Action。

  `connect`非常灵活，你可以决定传入`connect`的参数来让UI组件如何工作。默认情况下，`connect`会默认注入`dispatch`，且不监听store。

  ```javascript
  // APP为UI组件
  export default connect()(App)
  ```

  此时，App组件props中会有`dispatch`函数。更多的例子请看官网中的[示例代码](https://react-redux.js.org/api/connect#example-usage)。

  

- **[mapStateToProps()](https://react-redux.js.org/api/connect#mapstatetoprops-state-ownprops--object)** 

  `mapDispatchToProps`是`connect`函数的第一个参数。它的作用就是像它的名字那样，建立一个从（外部的）`state`对象到（UI 组件的）`props`对象的映射关系。

  `mapStateToProps`是一个函数，执行后应该返回一个对象，里面的每一个键值对就是一个映射。

  传入`mapStateToProps`会订阅 Store，每当`state`更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。

  `mapStateToProps`的第一个参数总是`state`对象，还可以使用第二个参数，代表容器组件的`props`对象。

  ```javascript
  // 第一个参数是指store中的state 第二个参数是指UI组件中的props
  const mapStateToprops = function (state, props) {
   return {
     value: state
   }
  }
  ```

  > 注意：`connect`方法可以省略`mapStateToProps`参数，那样的话，UI 组件就不会订阅Store，就是说 Store 的更新不会引起 UI 组件的更新。

  

- **[mapDispatchToProps()](https://react-redux.js.org/api/connect#mapdispatchtoprops-object--dispatch-ownprops--object)**

  `mapDispatchToProps`是`connect`函数的第二个参数，用来建立 UI 组件的参数到`store.dispatch`方法的映射。也就是说，它定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象。

  ```javascript
  // 作为函数返回时。 第一个参数是store中的dispatch 第二个参数是UI组件中的props
  const mapDispatchToProps = (
    dispatch,
    props
  ) => {
    return {
      increment: (value) =>  dispatch({type: INCREMENT, data: value});
    };
  }
  // 作为对象返回时，返回的 Action 会由 Redux 自动发出。
  const mapDispatchToProps = {
    increment: (value) =>  {type: INCREMENT, data: value};
  }
  ```




###### 该如何使用React-Redux?

1. 安装React-Redux的依赖

   ```powershell
   npm i react-redux
   ```

2. 引入`<Provider> `组件（容器组件）

   ```react
   // index.js
   
   // 从react-redux导入Provider
   import { Provider } from 'react-redux'
   // 导入store
   import store from './store'
   
   ReactDOM.render(
     <React.StrictMode>
         <Provider store={store}>
             <Count />
         </Provider>
     </React.StrictMode>,
     document.getElementById('root')
   );
   ```

3. 在使用到store的UI组件中用`connect`连接

   ```react
   // Count.js
   
   // 引入action
   import { inc, dec, incAsync } from './store/actions/count_action'
   // 导入 connect
   import { connect } from 'react-redux'
   
   export default connect()(Count)
   ```

   这种默认什么参数都不传的话，`connect`默认会在Count UI组件中的props注入`dispatch`函数且不监听store中state的变化

   ```react
   // Count.js
   
   // 引入action
   import { inc, dec, incAsync } from './store/actions/count_action'
   // 导入 connect
   import { connect } from 'react-redux'
   
   const Count = (props)=>{
       
       console.log(props.count);
   
       return(
           <div>
               <h1>当前求和为：{props.count}</h1>
   
               <button onClick={props.increment}>+1</button>&nbsp;
               <button onClick={props.decrement}>-1</button>&nbsp;
               <button onClick={props.incrementAsync}>Async +1</button>&nbsp;
           </div>
       )
   }
   
   function mapStateToProps(state) {
       return {
           count: state
       }
   }
   // 函数形式
   function mapDispatchToProps(dispatch) {
       return {
           increment: ()=> dispatch(inc(1)),
           decrement: ()=> dispatch(dec(1)),
           incrementAsync:()=> dispatch(incAsync(1, 1000))
       }
   }
   // 对象形式
   // const  mapDispatchToProps = {
   //     increment: ()=> inc(1),
   //     decrement: ()=> dec(1),
   //     incrementAsync:()=> incAsync(1, 1000)
   // }
   
   export default connect(mapStateToProps, mapDispatchToProps )(Count)
   ```

#### 未完待续......

入门阶段的相关知识点已经完成。后续会继续写上Redux用于解决异步问题的相关中间件



#### 参考文献

[Redux从设计到源码](https://tech.meituan.com/2017/07/14/redux-design-code.html)

[Redux 入门教程（一）：基本用法](https://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)

[[译]React Redux初学者完全教程(2019)](https://zhuanlan.zhihu.com/p/106957348)

