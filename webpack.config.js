// 'production' or 'development'
const path = require('path');
const MODE = "development";
const webpack = require('webpack')
const PATH = require('path');
const enabledSourceMap = MODE === "development";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: MODE,
    //ソースマップ
    devtool: "source-map",
    // メインとなるJavaScriptファイル（エントリーポイント）
    //entry: './src/assets/js/index.js',
    entry: {
      app: [
        './src/assets/js/index.js',
        './src/assets/scss/style.scss',
      ],
    },
    output: {
      //  出力ファイルのディレクトリ名
      path: `${__dirname}/dist`,
      // 出力ファイル名
      filename: "assets/js/app.js"
    },
    //ローカル環境
    devServer: {
        static:{
            directory:"dist",
        },
        open: true,
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery'
      }),
      new MiniCssExtractPlugin({
          filename: 'assets/css/style.css'
      }),
    ],
    module: {
      rules: [
        // Sassファイルの読み込みとコンパイル
        {
          test: /\.(sc|sa|c)ss$/, // 対象となるファイルの拡張子
          use: [
            // CSSファイルを書き出すオプションを有効にする
            {
              loader: MiniCssExtractPlugin.loader,
            },
            // CSSをバンドルするための機能
            {
              loader: "css-loader",
              options: {
                // オプションでCSS内のurl()メソッドの取り込みを禁止する
                url: false,
                // ソースマップの利用有無
                sourceMap: enabledSourceMap,

                // 0 => no loaders (default);
                // 1 => postcss-loader;
                // 2 => postcss-loader, sass-loader
                importLoaders: 2,
              },
            },/*
            // PostCSSのための設定
            {
              loader: "postcss-loader",
              options: {
                // PostCSS側でもソースマップを有効にする
                sourceMap: true,
                plugins: [
                  // Autoprefixerを有効化
                  // ベンダープレフィックスを自動付与する
                  require("autoprefixer")({
                    grid: true
                  })
                ]
              }
            },*/
            {
              loader: "sass-loader",
              options: {
                // ソースマップの利用有無
                sourceMap: enabledSourceMap,
                sassOptions: {
                  outputStyle: 'expanded',
                  includePaths: [path.resolve(__dirname, 'assets/sass/')]
                },
                
              },
            },
          ],
        },
      ]
    }
}