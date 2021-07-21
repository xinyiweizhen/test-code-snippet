import React from 'react'
// 引入store
// import store from './store'
// 引入action
import { inc, dec, incAsync } from './store/actions/count_action'
// 导入 connect
import { connect } from 'react-redux'

const Count = (props)=>{
    //  等于 count_reducer.js 中的initState
    // console.log(store.getState());

    console.log(props.count);

    // const increment = ()=>{
    //     // 等效于 store.dispatch({type: INCREMENT, data: 1})
    //     store.dispatch(inc(1))
    // }

    // const decrement = ()=>{
    //     // 等效于 store.dispatch({type: DECREMENT, data: 1})
    //     store.dispatch(dec(1))
    // }

    //异步加
    // const incrementAsync = ()=>{
    //     store.dispatch(incAsync(1, 1000))
    // }

    return(
        <div>
            {/* 获取store中的 state */}
            {/*<h1>当前求和为：{store.getState()}</h1>*/}
            <h1>当前求和为：{props.count}</h1>

            <button onClick={props.increment}>+1</button>&nbsp;
            <button onClick={props.decrement}>-1</button>&nbsp;
            <button onClick={props.incrementAsync}>Async +1</button>&nbsp;
        </div>
    )
}
//
function mapStateToProps(state) {
    return {
        count: state
    }
}

//
function mapDispatchToProps(dispatch) {
    return {
        increment: ()=> dispatch(inc(1)),
        decrement: ()=> dispatch(dec(1)),
        incrementAsync:()=> dispatch(incAsync(1, 1000))
    }
}

export default connect(mapStateToProps, mapDispatchToProps )(Count)
