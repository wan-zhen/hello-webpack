module.exports = {
    // 在 plugin 裡引用 autoprefixer
    plugins: [
        require('autoprefixer')({
            overrideBrowserslist: [
                // 瀏覽器相容結果 https://github.com/browserslist/browserslist
                '> 1%',
                'last 5 versions',
                'Firefox >=45',
                'iOS >=8',
                'Safari >=8',
                'ie >=10'
            ]
        })
    ]
}