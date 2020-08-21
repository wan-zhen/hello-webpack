// 把相對路徑組成絕對路徑
var path = require('path');
// dirname 當前的絕對路徑
console.log('dirname:', __dirname)
// 避免環境變了 路徑寫死會掛掉 所以拿到當前路徑來組相對路徑
console.log(path.resolve(__dirname, "./src"));
module.exports = {
    // 指定資料夾
    context: path.resolve(__dirname, "./src"),
    // 進入點
    entry: './index.js',
    output: {
        filename: 'index-bundle.js'
    }
}