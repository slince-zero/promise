const fs = require("fs");

// fs.readFile("./resource/index.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });
// promise 形式
let p = new Promise((resolve, reject) => {
  fs.readFile("./resource/index.txt", "utf-8", (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});
// 调用then
p.then(
  (data) => {
    console.log(data);
  },
  (err) => {
    console.log(err);
  }
);
