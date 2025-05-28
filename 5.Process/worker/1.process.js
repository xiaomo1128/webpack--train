const { spawn } = require("child_process"); // 核心子进程模块
const path = require("path"); // 路径模块
// spawn 产卵 ｜ fork 叉子 ｜ execFile 执行文件 ｜ exec 执行命令行

// process.stdin  0 标准输入
// process.stdout 1 标准输出
// process.stderr 2 错误输出 stream流式

// node sumljs
const cp = spawn("node", ["sum.js"], {
  cwd: path.resolve(__dirname, "worker"),
  stdio: "pipe", // 进程间通信
});

cp.stdout.on("data", function (data) {
  console.log(data.toString());
});

cp.on("error", function (err) {
  console.log(err, "子 error"); // 可在外面捕获进程错误
});

cp.on("exit", function () {
  console.log("子进程运行结束～");
});

cp.on("close", function (code) {
  console.log("子进程关闭，code:", code);
});

// 进程间默认没法通信，需要实现进程间的通信
// 默认情况下，子进程和父进程之间会创建一个管道，可在管道中进行读/写数据
