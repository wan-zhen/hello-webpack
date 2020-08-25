// nodejs 本身未支援 ES6 的語法，所以在寫 webpack 設定檔需要引入模組 要使用 require，不能用 import 的方式
// 把相對路徑組成絕對路徑
var path = require('path');
// dirname 當前的絕對路徑
console.log('dirname:', __dirname)
// 避免環境變了 路徑寫死會掛掉 所以拿到當前路徑來組相對路徑
console.log(path.resolve(__dirname, "./src"));
// windows install cross-env get NODE_ENV，並進一步取得 npm script 設定的值
console.log(process.env.NODE_ENV)

var CopyWebpackPlugin = require('copy-webpack-plugin');

var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    // set mode 'development'(執行速度較快) or 'production' (default 會優化、壓縮)
    mode: process.env.NODE_ENV,
    // 指定資料夾
    context: path.resolve(__dirname, "./src"),
    // 進入點
    entry: {
        // index: './js/index.js',
        // about: './js/about.js',
        // 因下面有設定 resolve 省略路徑還有 js 副檔名，所以可以簡化上面的寫法
        index: 'index',
        about: 'about'
    },
    output: {
        // 更改輸出 index-bundle.js 的路徑，預設為 dist
        // path: path.resolve(__dirname, "./dist-test"),

        // [name] 依照 entry 設定的 key 動態對應 output 的 filename
        // ?[hash:8] 引入的時候會自動產生快取版本號
        filename: './js/[name].js?[hash:8]'
    },
    resolve: {
        // 放要省略路徑的設定，引用的地方可以不用把完整的相對路徑打出來
        modules: [
            path.resolve('src'),
            path.resolve('src/js'),
            path.resolve('src/css'),
            path.resolve('src/scss'),
            path.resolve('src/images'),
            path.resolve('src/assets'),
            path.resolve('node_modules'),
        ],
        // 引入時可以不用把 js 的副檔名打出來，也可以設定其他副檔名，但不建議設定太多
        // 因為 main.js 、main.html 會不知道到底要引入哪支檔案
        extensions: ['.js']
    },
    // optimization 做 webpack 檔案優化 https://webpack.js.org/configuration/optimization/
    optimization: {
        splitChunks: {
            // 提取 node_modules 的內容打包成一支 vendor.js
            // 把原本 node_modules 會包在 entry 的內容裡給拆開
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    name: 'vendor',
                    chunks: 'initial',
                    enforce: true,
                }
            }
        }
    },
    devServer: {
        compress: true,
        port: 3000,
        stats: {
            assets: true,
            cached: false,
            chunkModules: false,
            chunkOrigins: false,
            chunks: false,
            colors: true,
            hash: false,
            modules: false,
            reasons: false,
            source: false,
            version: false,
            warnings: false
        },
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
            // html 已透過 HtmlWebpackPlugin 產生，不用再透過 file-loader 移進來
            // {
            //     // 透過 file-loader 把 html 副檔名的搬到 dist，所有檔案都可以透過 file-loader 搬移
            //     test: /\.html$/,
            //     use: [{
            //         loader: 'file-loader',
            //         options: {
            //             // [path] 路徑，[name] 檔名，[ext] 副檔名 自動判別 html 位子
            //             name: '[path][name].[ext]'
            //         }
            //     }]
            // },
            {
                test: /\.(sass|scss)$/,
                // 編譯順序 sass -> postcss -> css -> style
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                // 使用 bable 編譯 js
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                // loader 順序由下往上，先壓縮圖片再進行轉成 base64
                use: [
                    // 用 url-loader 把圖片轉成 base64
                    {
                        loader: 'url-loader',
                        options: {
                            // 小於 8192kb 的都轉成 base 64，直接存在引入的路徑裡，不會把圖片 deploy 出來
                            limit: 8192,
                            // 所有圖片檔案路徑為 路徑/檔名.副檔名?快取亂數
                            name: '[path][name].[ext]?[hash:8]'
                        }
                    },
                    // image-webpack-loader 壓縮圖片
                    {
                        // 原本 image 底下的 cat2.jpg 29.5KB，deploy 完 dist 出來的大小變 9.2KB
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            }
                        }
                    }
                ]
            },
            {
                // 想要讓引入其他副檔名，就要使用 file-loader 讓 webpack 認識
                test: /\.(woff|woff2|ttf|eot)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]?[hash:8]'
                }
            }
        ]
    },
    plugins: [
        // 設定起始從 src 資料夾底下的 assets 複製到 dist 底下的 assets 資料夾
        // 原封不動將檔案做搬移 ex : mp3 、zip、font 檔
        new CopyWebpackPlugin({ patterns: [{ from: 'assets', to: 'assets' }] }),
        // 全局注入 jquery ，只要看到 $、jQuery、window.jQuery 都會當 jquery 使用，
        // 不用在要用到 jquery 的時候 在每一支檔案引入一次
        // 這種全局注入非必要不要使用
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
        new HtmlWebpackPlugin({
            // 設定參數讓模板帶入 title
            title: 'Webpack前端自動化開發',
            // 要輸出的名子
            filename: 'index.html',
            // 模板從哪裡來
            template: 'html/template.html',
            // 設定參數讓模板帶入 
            viewport: 'width=device-width, initial-scale=1.0',
            // 對應  entries 的設定自動載入
            // ex : 原本 html 要自己引入<script src="index.js">，現在會自動引入
            chunks: ['vendor', 'index'],
        }),
        // 直接有 /about.html 產生
        new HtmlWebpackPlugin({
            title: 'about前端自動化開發',
            filename: 'about.html',
            template: 'html/template.html',
            viewport: 'width=device-width, initial-scale=1.0',
            chunks: ['vendor', 'about'],
        }),
    ]
}