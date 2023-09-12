/**
 * 封装一个函数，mineReadFile 读取文件内容
 * 参数：path 文件路径
 * 返回：promise 对象
 */
const fs = require("fs");
function mineReadFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
mineReadFile("./resource/index.txt").then(
  (data) => {
    console.log(data);
  },
  (err) => {
    console.log(err);
  }
);
