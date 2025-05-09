import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./store/cartSlice";
import CartApp from "./CartApp";
import "./index.css";

// 创建独立的 store，用于独立运行时
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// 仅在独立运行时渲染
const mount = () => {
  const container = document.getElementById("root");
  if (container) {
    const root = createRoot(container);
    root.render(
      <Provider store={store}>
        <BrowserRouter>
          <CartApp />
        </BrowserRouter>
      </Provider>
    );
  }
};

// 检查是否在容器内运行
if (!window.__SHELL_STORE__) {
  mount();
}

export {};
