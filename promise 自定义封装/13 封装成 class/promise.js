class Promise {
    constructor(exacutor) {
        this.PromiseState = 'pending';
        this.PromiseResult = null;
        this.callbacks = [];
        let self = this;

        function resolve(data) {
            if (self.PromiseState !== 'pending') return;
            self.PromiseState = 'fulfilled';
            self.PromiseResult = data;
            self.callbacks.forEach(item => {
                item.onResolved(data);
            });
        }

        function reject(data) {
            if (self.PromiseState !== 'pending') return;
            self.PromiseState = 'rejected';
            self.PromiseResult = data;
            self.callbacks.forEach(item => {
                item.onRejected(data);
            });
        }

        try {
            exacutor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    then(onResolved, onRejected) {
        const self = this;

        if (typeof onRejected !== 'function') {
            onRejected = reason => {
                throw reason;
            }
        }

        if (typeof onResolved !== 'function') {
            onResolved = value => value;
        }

        return new Promise((resolve, reject) => {
            function callback(type) {
                try {
                    const res = type(self.PromiseResult);
                    if (res instanceof Promise) {
                        res.then(v => {
                            resolve(v);
                        }, r => {
                            reject(r);
                        })
                    } else {
                        resolve(res);
                    }
                } catch (e) {
                    reject(e);
                }
            }

            if (this.PromiseState === 'fulfilled') {
                callback(onResolved);
            } else if (this.PromiseState === 'rejected') {
                callback(onRejected);
            }

            this.callbacks.push({
                onResolved: function () {
                    callback(onResolved);
                },
                onRejected: function () {
                    callback(onRejected);
                }
            });
        });
    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }

    static resolve(value) {
        return new Promise((resolve, reject) => {
            if (value instanceof Promise) {
                value.then(v => {
                    resolve(v);
                }, r => {
                    reject(r);
                })
            } else {
                resolve(value);
            }
        });
    }

    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason);
        });
    }
}