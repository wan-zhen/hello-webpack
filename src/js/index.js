// 把 CSS 放進 JS 裡
import "../css/index.css";
import "../scss/index.scss";
// 把 html 也 dist 出來 ，利用 file-loader 把檔案搬到 dist 裡
import "../index.html";
/* ---------------------------------------------- */
// 新增一些 ES6 的語法 測試 babel
let testArr = [1, 2, 3];
testArr.map((obj) => console.log(obj));
/* ---------------------------------------------- */
/** ES5 引入模組方式 */
var test = require('./testModule.js');
// will get {name: "zhen"}
console.log(test)

var test1 = require('./testModule1.js');
// will console function
console.log(test1);
// 可以直接使用
test1('zhen');
/* ---------------------------------------------- */
/** ES6 引入模組方式 */
// 注意 沒有裝 babel-loader 的話不能用
import test2 from './testDefault';
// will get {name: "zhenzhen"}
console.log(test2);

import test3 from './testDefault1';
// will console function
console.log(test3);
// 可以直接使用
test3('zhenzhen');
/* ---------------------------------------------- */
class Main {
    constructor() {
        this.name = 'zhenClass';
        // document.querySelector('#link').addEventListener('click', this.logState)
        document.querySelector('#link').addEventListener('click', this.logState.bind(this))
        this.logState();
    }

    logState() {
        console.log(this.name);
    }
}
new Main();