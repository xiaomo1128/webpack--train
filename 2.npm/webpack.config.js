const path = require("path");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");

console.log("webpack process.env.NODE_ENV ->", process.env.NODE_ENV);

const baseConfig = {
  mode: process.env.NODE_ENV,
  //   devtool: "source-map",
  entry: "./src/index.js",
  externals: [
    // 排除所有第三方模块
    nodeExternals(),
    // 排除node_modules 指定模块
    // {
    //     allowlist: ["jquery", "lodash"],
    // }
    // {
    //   jquery: {
    //     commonjs: "jquery",
    //     commonjs2: "jquery",
    //     amd: "jquery",
    //     root: "$",
    //   },
    //   lodash: {
    //     commonjs: "lodash",
    //     commonjs2: "lodash",
    //     amd: "lodash",
    //     root: "_",
    //   },
    // },
  ],
  output: {
    // library: "math", // 库的名称
    // libraryExport: "add", //导出的模块 string | string[] | object
    clean: true, // 清空dist目录
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              targets: {
                browsers: [">0.1%"], // 兼容浏览器
              },
              /** polyfill.io 相当于 entry 会考虑浏览器，不会考虑使用情况 */
              /*============================================================= */
              /** 开发类库： 尽量不要污染全局环境 */
              /** 开发类库配置 ------ start */
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: false, // 开发类库配置，不要使用polyfill污染全局环境
                  },
                ],
              ],
              plugins: [
                [
                  "@babel/plugin-transform-runtime", // 只使用其中的helpers 和 regenerator 减小打包体积 需要安装@babel/runtime-corejs3
                  {
                    corejs: 3, // 使用此插件的polyfill
                    helpers: true, // 内联帮助程序 默认true，减少打包体积
                    regenerator: false, // 使用regenerator runtime 默认true，false减少打包体积
                  },
                ],
              ],
              /** 开发类库配置 ------ end */
              /*============================================================= */
              /**
               * 项目环境：
               * @babel/preset-env 会根据配置的目标环境，生成代码，但是不会自动引入polyfill
               * @babel/plugin-transform-runtime 会自动引入polyfill
               * 两者结合使用，可以实现按需引入polyfill
               */
              /** 项目环境配置 ---- start */
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage", // false不使用polyfill 会导致报错. 实际项目中使用 usage
                    corejs: 3, // 指定corejs版本
                  },
                ],
              ],
              plugins: [
                [
                  "@babel/plugin-transform-runtime", // 只使用其中的helpers 和 regenerator 减小打包体积 需要安装@babel/runtime-corejs3
                  {
                    corejs: false, // 不使用此插件的polyfill
                    helpers: true, // 内联帮助程序 默认true，减少打包体积
                    regenerator: false, // 使用regenerator runtime 默认true，false减少打包体积
                  },
                ],
              ],
              /** 项目环境配置 ---- end */
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    // webpack 定义全局变量  上面的mode可以不用配置
    // new webpack.DefinePlugin({
    //   "process.env.NODE_ENV": JSON.stringify("production"),
    // }),
  ],
};

module.exports = baseConfig;

module.exports2 = [
  merge(baseConfig, {
    output: {
      filename: "[name]-umd.js",
      libraryTarget: "umd",
    },
  }),
  //   merge(baseConfig, {
  //     output: {
  //       filename: "[name]-commonjs.js",
  //       libraryTarget: "commonjs2",
  //     },
  //   }),
  //   merge(baseConfig, {
  //     output: {
  //       filename: "[name]-amd.js",
  //       libraryTarget: "amd",
  //     },
  //   }),
];
