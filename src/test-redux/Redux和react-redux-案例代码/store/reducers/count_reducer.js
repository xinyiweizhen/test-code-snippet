import {INCREMENT, DECREMENT} from "./constant";


const initState = 0;

export default function countReducer(state = initState, action) {
    switch (action.type) {
        case INCREMENT:
            return state + action.data;
        case DECREMENT:
            return state - action.data;
        default:
            return state
    }
}
