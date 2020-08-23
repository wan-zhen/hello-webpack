// 把 CSS 放進 JS 裡
import "../css/index.css";
import "../scss/index.scss";
// 把 html 也 dist 出來 ，利用 file-loader 把檔案搬到 dist 裡
import "../index.html";

// 新增一些 ES6 的語法
let testArr = [1, 2, 3];
testArr.map((obj) => console.log(obj));

var test = require('./testModule.js');
// will get {name: "zhen"}
console.log(test)

var test1 = require('./testModule1.js');
// will console function
console.log(test1);
// 可以直接使用
test1('zhen');