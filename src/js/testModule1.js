// 可以用 module.exports 把 function 模組化
// 外面要用的人可以直接 require
// 此為 ES5 的方式
module.exports = function (name) {
    console.log(name)
}