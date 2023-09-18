// 声明构造函数
function Promise(exacutor) {
    // 添加属性
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    this.callbacks = [];
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
        self.callbacks.forEach(item => {
            item.onResolved(data);
        });
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
        self.callbacks.forEach(item => {
            item.onRejected(data);
        });
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
    return new Promise((resolve, reject) => {
        // 调用回调函数
        if (this.PromiseState === 'fulfilled') {
            try {
                // 获取回调函数的执行结果
                const res = onResolved(this.PromiseResult);
                // 判断
                if (res instanceof Promise) {
                    // 如果是 promise 类型的对象
                    res.then(v => {
                        resolve(v);
                    }, r => {
                        reject(r);
                    })
                } else {
                    // 结果状态改为成功
                    resolve(res);
                }
            }catch(e){
                reject(e);
            }
        } else if (this.PromiseState === 'rejected') {
            onRejected(this.PromiseResult);
        }
        // 保存回调函数
        this.callbacks.push({
            onResolved: onResolved,
            onRejected: onRejected
        });
    })
}