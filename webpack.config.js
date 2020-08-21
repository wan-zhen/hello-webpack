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
    entry: {
        index: './js/index.js',
        about: './js/about.js',
    },
    output: {
        // 更改輸出 index-bundle.js 的路徑，預設為 dist
        // path: path.resolve(__dirname, "./dist-test"),

        // [name] 依照 entry 設定的 key 動態對應 output 的 filename
        filename: './js/[name].js'
    },
    module: {
        rules: [
            {
                // 讓 webpack 讀 .css 的副檔名
                test: /\.css$/,
                // use loader 順序由後面執行到前面，所以先使用 postcss-loader 加上 prefix 再 css-loader 再執行 style-loader
                // style-loader : 把 CSS 注入到 JS
                // https://github.com/webpack-contrib/css-loader
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                // 透過 file-loader 把 html 副檔名的搬到 dist，所有檔案都可以透過 file-loader 搬移
                test: /\.html$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        // [path] 路徑，[name] 檔名，[ext] 副檔名 自動判別 html 位子
                        name: '[path][name].[ext]'
                    }
                }]
            }, {
                test: /\.(sass|scss)$/,
                // 編譯順序 sass -> postcss -> css -> style
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    }
}