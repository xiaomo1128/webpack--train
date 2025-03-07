const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const FileManagerWebpackPlugin = require("filemanager-webpack-plugin");

module.exports = {
  mode: "development",
  /**
   * 如何调试测试环境代码：
   * 把代码发布到了测试环境，不希望测试人员能看到 源文件
   * 但是开发需要看到 源文件，可以把 .map文件放在localhost本地测试
   */
  /**
   * 生产(线上)环境配置：
   * 不直接提供sourcemap文件给浏览器，因为会暴露源码，但是需要提供sourcemap文件给错误监控系统
   * devtool：hidden-source-map
   * 生成的 .map文件不会暴露给浏览器，但是会提供给错误监控系统（sentry）
   * hidden 不会在bundle.js中提示有sourcemap文件
   */
  //   devtool: "hidden-source-map",
  /** 开发环境推荐配置：
   * devtool：cheap-module-eval-source-map
   * 优点：编译速度快，生成的sourcemap文件较小，适合开发环境
   * 缺点：只能定位到行，不能定位到列
   * module 包含loader模块之间的sourceMap
   * eval 因为在开发环境频繁修改代码，频繁重新构建，需要缓存提升重新构建的速度
   */
  //   devtool: "inline-source-map", // 生成一个DataUrl(base64)的形式的sourcemap,不单独生成.map文件,会将sourcemap打包到bundle.js中 适合开发环境
  // devtool: "cheap-source-map", // 只有行信息
  //   devtool: "cheap-module-source-map", // 只有行信息 不包含模块的loader的map
  //   devtool: "source-map", // 完整的sourcemap 行和列信息
  output: {
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    /**
     * 自定义sourceMap文件
     * 内置插件，精细化控制sourceMap
     */
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map[query]",
      //   append: "\n//# sourceMappingURL=http://127.0.0.1:2000/[url]",
      append: false, // 不在bundle.js中追加sourcemap文件路径
    }),
    /**
     * 用于将sourcemap文件复制到指定目录
     */
    new FileManagerWebpackPlugin({
      events: {
        onStart: {
          delete: [path.resolve("./sourcemaps")],
        },
        // 在打包后 copy 事件
        onEnd: {
          copy: [
            {
              source: "./dist/*.map",
              // 该目录执行 http-server -c -1 -p 2000 启动一个本地服务器 -c -1 表示不缓存,同时dist目录也需要起服务,devtool=false
              destination: path.resolve("./sourcemaps"),
            },
          ],
          delete: ["./dist/*.map"],
        },
      },
    }),
  ],
};
