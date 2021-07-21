import React from 'react'
// 引入store
// import store from './store'
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
//
function mapStateToProps(state) {
    return {
        count: state
    }
}

/**
 * 这个等效于
 *
 *
 */
function mapDispatchToProps(dispatch) {
    return {
        increment: ()=> dispatch(inc(1)),
        decrement: ()=> dispatch(dec(1)),
        incrementAsync:()=> dispatch(incAsync(1, 1000))
    }
}

// const  mapDispatchToProps = {
//     increment: ()=> inc(1),
//     decrement: ()=> dec(1),
//     incrementAsync:()=> incAsync(1, 1000)
// }

export default connect(mapStateToProps, {
    increment: ()=> inc(1),
    decrement: ()=> dec(1),
    incrementAsync:()=> incAsync(1, 1000)
} )(Count)
