####  React性能优化

###### [shouldComponentUpdate](https://zh-hans.reactjs.org/docs/optimizing-performance.html#shouldcomponentupdate-in-action)（类组件）

- what？

  React组件(`React.Component`)的一个生命周期方法`shouldComponentUpdate(nextProps, nextState)`），该函数会在组件重新渲染之前调用，由函数的返回的boolean值决定是否重新渲染组件。

  > ```react
  > shouldComponentUpdate(nextProps, nextState)
  > ```

  简单地说，你可以通过重载这个方法，去对比该组件的**目前的**以及**即将收到的**props和state来决定**是否重新渲染**该组件。

- how?

  - 使用场景: **类组件中,判断某个基础类型值被修改了才触发组件更新**。
  - 作用: **减少 rerender 次数**

  下面是一个只有当 `props.color`/`state.count` 的值改变，`Child`组件才重新渲染的例子，`Parent`组件修改自己的状态不会导致子组件渲染

  ```react
  class CounterButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = {count: 1};
    }
  
    shouldComponentUpdate(nextProps, nextState) {
      if (this.props.color !== nextProps.color) {
        return true;
      }
      if (this.state.count !== nextState.count) {
        return true;
      }
      return false;
    }
  
    render() {
      return (
        <button
          color={this.props.color}
          onClick={() => this.setState(state => ({count: state.count + 1}))}>
          Count: {this.state.count}
        </button>
      );
    }
  }
  ```

  

- why?

  根据 shouldComponentUpdate() 的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响。

  默认行为是 state 每次发生变化组件都会重新渲染。

  当 props 或 state 发生变化时，shouldComponentUpdate() 会在渲染执行之前被调用。返回值默认为 true。

  首次渲染或使用 forceUpdate() 时不会调用该方法。

###### 注意事项：

- 不建议在 `shouldComponentUpdate()` 中进行深层比较或使用 `JSON.stringify()`。这样非常影响效率，且会损害性能

> 深比较也称原值相等，深比较是指检查两个对象的所有属性是否都相等,深比较需要以递归的方式遍历两个对象的所有属性， 操作比较耗时，深比较不管这两个对象是不是同一对象的引用

