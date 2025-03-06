const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const EslintPlugin = require("eslint-webpack-plugin");

// 获取环境变量
const NODE_ENV = process.env.NODE_ENV;
const isProduction = NODE_ENV === "production";

module.exports = {
  // entry: "./src/index.ts",
  entry: "./src/index.js",
  // entry: ["./src/entry1.js", "./src/entry2.js"],
  // 多页面应用
  // entry: {
  //   entry1: "./src/entry1.js",
  //   entry2: "./src/entry2.js",
  // },
  // entry: {
  //   vendor: "./src/vendor.js",
  //   main: {
  //     // 指定入口文件
  //     import: "./src/index.js",
  //     // dependOn: "vendor", // 依赖于vendor
  //     // 不设置runtimeChunk时，runtime会被打包到main.js中
  //     runtime: "runtime-main",
  //   },
  // },
  mode: "development",
  devtool: false,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js", // 多页面应用
    // filename: "bundle.js",
    clean: true, // 清空dist目录
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      // {
      //   test: /\.(jpe?g|png)$/i,
      //   //oneOf是一个优化选项，用于提高打包的速度
      //   oneOf: [
      //     {
      //       //resourceQuery是一个用于匹配请求资源的URL中查询字符中
      //       resourceQuery: /sizes/,
      //       use: [
      //         {
      //           loader: "responsive-loader",
      //           options: {
      //             sizes: [300, 600, 1024],
      //             adapter: require("responsive-loader/sharp"),
      //           },
      //         },
      //       ],
      //     },
      //     {
      //       type: "asset/resource",
      //     },
      //   ],
      // },
      // {
      //   // 匹配文件的正则表达式，这里表示匹配JPG、PNG、GIF和SVG格式的图片文件
      //   test: /\.(jpe?g|png|gif|svg)$/i,
      //   use: [
      //     {
      //       // 使用image-webpack-loader对图片进行优化和压缩
      //       loader: "image-webpack-loader",
      //       options: {
      //         // 是否禁用图片优化和压缩
      //         disable: !isProduction,
      //         mozjpeg: {
      //           progressive: true, // 是否开启渐进式JPEG，可以有效提升JPEG图片加载速度
      //           quality: 65, // 压缩JPEG图片的质量，取值范围为0到100，值越大质量越好但文件越大
      //         },
      //         optipng: {
      //           enabled: true, // 是否开启PNG图片的优化，可以有效提升PNG图片加载速度
      //         },
      //         pngquant: {
      //           // 压缩PNG图片的质量范围，取值范围为0到1，值越大质量越好但文件越大
      //           // 第一个数字表示压缩质量的下限，第二个数字表示压缩质量的上限
      //           quality: [0.65, 0.9],
      //           speed: 4, // 压缩PNG图片的速度，取值范围为1到10，值越大速度越快但质量越低
      //         },
      //         svgo: {
      //           plugins: [
      //             // 压缩SVG图片的插件列表，这里包含removeViewBox和cleanupIDs两个插件
      //             {
      //               //用于删除SVG图片中的viewBox属性
      //               //viewBox属性是用来指定SVG视口范围的，它的值是一个矩形框的坐标和宽高
      //               removeViewBox: false,
      //             },
      //             {
      //               //用于删除SVG图片中的无用ID属性
      //               cleanupIDs: true,
      //             },
      //           ],
      //         },
      //         gifsicle: {
      //           interlaced: true, // 是否开启GIF图片的隔行扫描,可以有效提升GIF图片加载速度
      //         },
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.txt$/,
        type: "asset/source", // 适用于文本文件
      },
      {
        test: /\.png$/,
        type: "asset", // 适用于大图片 文件与base64之间的转换
        // 图片小于某个阀值时，转为base64
        parser: {
          dataUrlCondition: {
            maxSize: 1024,
          },
        },
        // type: 'asset/inline' // base64 会被打包到js文件中  适用于小图片 会增加js文件体积 会减少http请求
        // type: 'asset/resource' // 文件绝对路径
      },
      {
        test: /\.ts$/,
        use: [
          // "ts-node" // 编译慢，不推荐使用
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-typescript"],
            },
          },
        ],
      },
      {
        test: /\.js$/,
        use: [
          {
            /**
             * 可以将es6转为es5
             */
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              // plugins:[]// 装饰器插件需要单独配置
            },
          },
        ],
      },
      {
        // 指定匹配规则，匹配以.css结尾的文件
        test: /\.css$/,
        // 指定转换方式 从下往上执行 从右往左执行
        use: [
          // 通过style标签动态将css样式插入到html中
          // "style-loader",
          // MiniCssExtractPlugin.loader  与style-loader互斥 不能同时使用 会报错
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          // 将css文件转换为js文件
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    // new HtmlWebpackPlugin({
    //   template: "./src/entry1.html",
    //   filename: "entry1.html",
    //   chunks: ["entry1"], // 多页面应用 指定入口文件
    // }),
    // new HtmlWebpackPlugin({
    //   template: "./src/entry2.html",
    //   filename: "entry2.html",
    //   chunks: ["entry2"],
    // }),
    //
    /**
     *  生成单独的css文件 利于维护
     * 与style-loader互斥 不能同时使用 会报错
     *  减少js文件体积
     * 通过link标签引入css文件
     * 可以让css文件和js文件并行加载 提高加载效率
     */
    new MiniCssExtractPlugin(),
    // new EslintPlugin({
    //   extensions: [".js", ".ts"],
    // }),
  ],
  devServer: {
    host: "localhost",
    port: 3333,
    open: true, // 自动打开浏览器
    compress: true, // 启用gzip压缩 服务器压缩
    hot: true, // 热更新
    // 监听文件变化 若不配置watchFiles 则默认监听所有文件
    watchFiles: ["src/**/*.js"],
    historyApiFallback: true, //不管访问什么路径，都会把请求重定向到index.html，交给前端路由处理
    proxy: [
      {
        context: ["/api"], // 需要代理的路由前缀
        target: "http://localhost:2000",
        pathRewrite: { "^/api": "" }, // 可选，用于重写路径
        // changeOrigin: true,
        // secure: false
      },
    ],
    // 没有后端服务器，可以使用before方法模拟后端接口  类似 mock功能
    // onBeforeSetupMiddleware({ app }) {
    //   app.get("/api/user", (req, res) => {
    //     res.json({ name: "zhangsan", age: 18 });
    //   });
    // },
  },
};
