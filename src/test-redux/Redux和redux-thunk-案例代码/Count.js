import React from 'react'
// 引入store
import store from './store'
// 引入action
import { inc, dec, incAsync } from './store/actions/count_action'

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

    //异步加
    const incrementAsync = ()=>{
        store.dispatch(incAsync(1, 1000))
    }

    return(
        <div>
            {/* 获取store中的 state */}
            <h1>当前求和为：{store.getState()}</h1>

            <button onClick={increment}>+1</button>&nbsp;
            <button onClick={decrement}>-1</button>&nbsp;
            <button onClick={incrementAsync}>Async +1</button>&nbsp;
        </div>
    )
}

export default Count
