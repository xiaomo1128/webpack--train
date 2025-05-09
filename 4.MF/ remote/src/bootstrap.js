import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")).render(<App />);
// 在React17之前，<App />会被babel编译成React.createElement
// 之后的版本不需要，在babel编译时会自动引入一个jsx方法，实现跟React.createElement类似的功能

