const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js', // 组件库入口文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js', // 每个组件单独打包
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    externals: {
        vue: 'vue',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.vue'], // 解析扩展名
        alias: {
            vue$: 'vue/dist/vue.common.js', // 解决 Vue 版本问题
            '@': path.resolve(__dirname, 'src'),
        },
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['babel-loader', 'ts-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/, // 处理 .scss 文件
                use: [
                    'vue-style-loader', // 用于将样式注入到页面
                    'css-loader', // 将 CSS 转换为 CommonJS 模块
                    'sass-loader', // 将 Sass 转换为 CSS
                ],
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(), // 需要 VueLoaderPlugin 来处理 .vue 文件
        new CleanWebpackPlugin(),
    ],
    externals: {
        vue: 'Vue', // 在组件库中不打包 Vue，而是作为外部依赖
    },
    devtool: 'source-map', // 为调试生成 source map
};
