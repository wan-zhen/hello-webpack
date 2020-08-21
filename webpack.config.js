// 把相對路徑組成絕對路徑
var path = require('path');
// dirname 當前的絕對路徑
console.log('dirname:', __dirname)
// 避免環境變了 路徑寫死會掛掉 所以拿到當前路徑來組相對路徑
console.log(path.resolve(__dirname, "./src"));
// windows install cross-env get NODE_ENV，並進一步取得 npm script 設定的值
console.log(process.env.NODE_ENV)
module.exports = {
    // set mode 'development'(執行速度較快) or 'production' (default 會優化、壓縮)
     mode: process.env.NODE_ENV,
    // 指定資料夾
    context: path.resolve(__dirname, "./src"),
    // 進入點
    entry: './index.js',
    output: {
        // 更改輸出 index-bundle.js 的路徑，預設為 dist
        // path: path.resolve(__dirname, "./dist-test"),
        filename: 'index-bundle.js'
    }
}