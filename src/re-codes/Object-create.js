/**
 * 手写Object.create()
 *  思路：将传入的对象作为原型
 * @param obj
 * @returns {F}
 */
// 这里并没有覆盖 Object.create
function create(proto, propertiesObject){
    function F() {
    }
    F.prototype = proto
    const obj =  new F()
    if (propertiesObject !== undefined) {
        Object.defineProperties(obj, propertiesObject)
    }
    if (proto === null) {
        // 创建一个没有原型对象的对象，Object.create(null)
        obj.__proto__ = null
    }
    return obj
}
