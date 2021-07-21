import {createStore, applyMiddleware } from 'redux'
// 引入redux-thunk，用于支持异步action
import thunk from "redux-thunk";
import countReducer from "./reducers/count_reducer";

//暴露store, 引用中间件
export default createStore(countReducer, applyMiddleware(thunk))
