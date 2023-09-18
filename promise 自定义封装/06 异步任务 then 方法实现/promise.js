// 声明构造函数
function Promise(exacutor) {
    // 添加属性
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    this.callback = {};
    // 保存实例对象 this 的值
    let self = this;
    // resolve 函数
    function resolve(data) {
        // 判断状态
        if (self.PromiseState !== 'pending') return;
        // 修改对象状态
        self.PromiseState = 'fulfilled'; // 或 resolve
        // 设置对象结果值
        self.PromiseResult = data;
        // 调用回调函数
        self.callback.onResolved(data);
    }
    // reject 函数
    function reject(data) {
        // 判断状态
        if (self.PromiseState !== 'pending') return;
        // 修改对象状态
        self.PromiseState = 'rejected';
        // 设置对象结果值
        self.PromiseResult = data;
        // 调用回调函数
        self.callback.onRejected(data);
    }
    try {
        // 同步调用【执行器函数】
        exacutor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}
// 添加 then 方法
// 有坑，这里不能用箭头函数来定义，这里箭头函数绑定父级作用域的 this
// 而不是 promise 实例对象的 this
Promise.prototype.then = function (onResolved, onRejected) {
    // 调用回调函数
    if (this.PromiseState === 'fulfilled') {
        onResolve(this.PromiseResult);
    } else if (this.PromiseState === 'rejected') {
        onRejected(this.PromiseResult);
    }
    // 保存回调函数
    this.callback = {
        onResolved: onResolved,
        onRejected: onRejected
    }
}