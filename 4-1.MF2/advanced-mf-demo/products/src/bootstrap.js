import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./store/productsSlice";
import ProductsApp from "./ProductsApp";
import "./index.css";

// 创建独立的 store，用于独立运行时
const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

// 仅在独立运行时渲染
const mount = () => {
  const container = document.getElementById("root");
  if (container) {
    const root = createRoot(container);
    root.render(<ProductsApp />);
  }
};

// 检查是否在容器内运行
if (!window.__SHELL_STORE__) {
  mount();
}

export {};
