// import './style.css'
//
// let count  = 1
//
// const container = document.querySelector('#container')
//
// function getUserAction(){
//     console.log('get',this);
//     container.innerHTML = count++
// }
//
// function debounce(func, wait) {
//     var timeout;
//     console.log('outer',this);
//     return function () {
//         const context = this
//         const args = arguments
//         console.log('inner',this, this === container);
//         clearTimeout(timeout)
//         timeout = setTimeout(function () {
//             func.apply(context, args)
//         }, wait);
//     }
// }
//
// container.onmousemove = debounce(getUserAction, 500);
//
// function fun3() {
//     console.log('fun3')
// }
//
// function fun2() {
//     fun3();
// }
//
// function fun1() {
//     fun2();
// }
//
// fun1();
/**
 * 二分查找（非递归）
 * @param list  一个有序的数组
 * @param target 目标
 * @returns {null|*}
 */
// function binarySearch(list, target){
//     let start = 0, end = list.length - 1
//     // 重点: 因为闭区间，所以到了begin等于end时，其实区间内还有一个值要判断，因此只有begin>end的时候才能停止
//     while (start <= end){
//         let mid = ((start + end) / 2) >>> 1
//         if(list[mid] === target){
//             return list[mid]
//         }else if(list[mid] > target){
//             end = mid - 1
//         }else {
//             start = mid + 1
//         }
//     }
//     return null
// }

/**
 * 二分查找（递归版本）
 * @param list
 * @param target
 * @returns {number}
 */
// function binarySearch(list, target){
//     function search(list, start, end, target){
//         if(start > end) return -1
//         let mid = ((start + end) / 2) >>> 1
//         if(list[mid] === target){
//             return list[mid]
//         } else if(list[mid] > target){
//             return search(list, start, mid - 1, target)
//         }else {
//             return search(list, mid + 1, end, target)
//         }
//     }
//     return search(list, 0, list.length -1, target)
// }
//
// const array = [1,2,3,4,5,6,7,8,9,10]
// console.log(binarySearch(array, 4));




const rowset = [
    {  "showSeq": 10,
    "componentKey": "check_type",
    "title": "审核类型:",
    "type": "select_item",
    "prompt_msg": "请填写审核类型",
    "readonly":false,
    "required":true,
    "span":8 ,
    "classify":'BASIC',
    "tabGroup":'BASIC_INFO'},
    {  "showSeq": 10,
    "componentKey": "check_type",
    "title": "审核类型:",
    "type": "select_item",
    "prompt_msg": "请填写审核类型",
    "readonly":false,
    "required":true,
    "span":8 ,
    "classify":'BASIC',
    "tabGroup":'BASIC_INFO'
},
{  "showSeq": 10,
    "componentKey": "check_type",
    "title": "审核类型:",
    "type": "select_item",
    "prompt_msg": "请填写审核类型",
    "readonly":false,
    "required":true,
    "span":8 ,
    "classify":'WORKS',
    "tabGroup":'APPLY_INFO'    //这里是另一个tab页

},
    {
    "showSeq": 10,
        "componentKey": "check_type",
        "title": "审核类型:",
        "type": "select_item",
        "prompt_msg": "请填写审核类型",
        "readonly":false,
        "required":true,
        "span":8 ,
        "classify":'WORKS',
        "tabGroup":'APPLY_INFO'    //这里是另一个tab页
}
]


// const list = rowset.reduce((previousValue, currentValue, currentIndex) => {
//     rowset.map(item =>{
//         if(currentValue.tabGroup === item.tabGroup){
//             previousValue[item.tabGroup] = {
//                 [item.classify]: rowset.filter((item2)=>item2.classify === item.classify)
//             }
//         }
//         if(currentValue.classify === item.classify){
//             arr.push(item)
//         }
//     })
//     return previousValue
// }, {})


// let targetObject = {}
//
// for (const out of rowset) {
//     for (const inner of rowset) {
//         // 找出相同的 tabGroup
//         if(out.tabGroup === inner.tabGroup){
//             let arr = []
//             // 找出相同的 classify
//             for (const item of rowset) {
//                 if(inner.classify === item.classify){
//                     arr.push(item)
//                 }
//             }
//             // 填入对象中
//             targetObject[inner.tabGroup] = {
//                 [inner.classify]: arr
//             }
//         }
//     }
// }


console.log(list);
