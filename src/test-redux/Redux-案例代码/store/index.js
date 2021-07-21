import {createStore } from 'redux'
import countReducer from "./reducers/count_reducer";

//暴露store
export default createStore(countReducer)
