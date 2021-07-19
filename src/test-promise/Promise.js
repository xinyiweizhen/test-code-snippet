/**
 * Promise构造函数接收一个executor函数，executor函数执行完同步或异步操作后，调用它的两个参数resolve和reject
 * @type {Promise<unknown>}
 */
var promise = new Promise((resolve, reject)=>{

})


function Promise(executor) {
    var self = this;
    self.status = 'pending'; // Promise当前的状态
    self.data = undefined; // Promise的值
    self.onResolvedCallback = []; // Promise resolve时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面
    self.onRejectedCallback = []; // Promise reject时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面


    function resolve(value) {
        if(self.status === 'pending'){
            self.status = 'resolved';
            self.data = value;
            for (var i = 0; i < self.onResolvedCallback.length; i++) {
                self.onResolvedCallback[i](value)
            }
        }
    }

    function reject(reason) {
        if (self.status === 'pending') {
            self.status = 'rejected'
            self.data = reason
            for(var i = 0; i < self.onRejectedCallback.length; i++) {
                self.onRejectedCallback[i](reason)
            }
        }
    }

    /**
     * 考虑到执行executor的过程中有可能出错，所以我们用try/catch块给包起来，并且在出错后以catch到的值reject掉这个Promise
     */
    try {
        executor(resolve, reject) // 执行executor并传入相应的参数
    }catch (e) {
        reject(e)
    }

}
