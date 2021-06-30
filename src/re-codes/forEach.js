Array.prototype.forEach1 = function (callback, thisArg) {
    if(this === null){
        throw new TypeError('this is null or not defined');
    }
    if(typeof callback !== 'function'){
        throw new TypeError(callback + ' is not a function');
    }
    const arr = Object(this);

    const len = arr.length >>> 0;
    let k = 0;
    while ( k <len){
        if(k in arr){
            callback.call(thisArg, arr[k], k, arr);
        }
        k++;
    }

}

let arr = [1,2,3,3,3,3,5,6]
console.log(Object(arr));
arr.forEach1((item, index)=>{
    console.log(item, index);
})
