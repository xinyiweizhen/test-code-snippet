import {INCREMENT, DECREMENT} from "../reducers/constant";

//同步action，就是指action的值为Object类型的一般对象
export const inc = data => ({type:INCREMENT,data})
export const dec = data => ({type:DECREMENT,data})
