// 把相對路徑組成絕對路徑
var path = require('path');
// dirname 當前的絕對路徑
console.log('dirname:', __dirname)
// 避免環境變了 路徑寫死會掛掉 所以拿到當前路徑來組相對路徑
console.log(path.resolve(__dirname, "./src"));
// windows install cross-env get NODE_ENV，並進一步取得 npm script 設定的值
console.log(process.env.NODE_ENV)
// 引入 extract-text-webpack-plugin
// https://github.com/webpack-contrib/extract-text-webpack-plugin
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// css/[name].css 資料夾路徑
var extractCSS = new ExtractTextPlugin('css/[name].css')
module.exports = {
    // set mode 'development'(執行速度較快) or 'production' (default 會優化、壓縮)
    mode: process.env.NODE_ENV,
    // 指定資料夾
    context: path.resolve(__dirname, "./src"),
    // 進入點
    entry: {
        index: './js/index.js',
        about: './js/about.js',
    },
    output: {
        // 更改輸出 index-bundle.js 的路徑，預設為 dist
        // path: path.resolve(__dirname, "./dist-test"),

        // [name] 依照 entry 設定的 key 動態對應 output 的 filename
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                // 讓 webpack 讀 .css 的副檔名
                test: /\.css$/,
                // use loader 順序由後面執行到前面，所以先使用 css-loader 在執行 style-loader
                // style-loader : 把 CSS 注入到 JS
                // https://github.com/webpack-contrib/css-loader
                // use: extractCSS.extract(['style-loader', 'css-loader'])
                use: extractCSS.extract(['css-loader'])
            }
        ]
    },
    // 使用 extractCSS 把 CSS 拉出來獨力一隻檔案 ，不要放在 JS 裡
    plugins: [
        extractCSS
    ]
}