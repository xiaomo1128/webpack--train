const path = require("path");
const webpack = require("webpack");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { plugins } = require("../../3.sourcemap/webpack.config");

module.exports = {
  mode: "development",
  devtool: false,
  entry: "./src/index.js",
  output: {
    //把生成的bundle.js文件写入html时，需要添加的前缀
    publicPath: "http://localhost:2000/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react"], // 把react转为es5
            },
          },
        ],
      },
    ],
  },
  devServer: {
    port: 2000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
