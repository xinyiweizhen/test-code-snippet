/**
 * 手写Object.create()
 *  思路：将传入的对象作为原型
 * @param obj
 * @returns {F}
 */
function creacte(obj){
    function F() {
    }
    F.prototype = obj
    return new F()
}
