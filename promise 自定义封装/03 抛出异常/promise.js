// 声明构造函数
function Promise(exacutor) {
    // 添加属性
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    // 保存实例对象 this 的值
    let self = this;
    // resolve 函数
    function resolve(data) {
        // 修改对象状态
        self.PromiseState = 'fulfilled'; // 或 resolve
        // 设置对象结果值
        self.PromiseResult = data;
    }
    // reject 函数
    function reject(data) {
        // 修改对象状态
        self.PromiseState = 'rejected';
        // 设置对象结果值
        self.PromiseResult = data;
    }
    try {
        // 同步调用【执行器函数】
        exacutor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}
// 添加 then 方法
Promise.prototype.then = (onResolve, onReject) => {

}