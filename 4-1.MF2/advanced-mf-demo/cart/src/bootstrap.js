import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./store/cartSlice";
import CartApp from "./CartApp";
import { getEventBus } from "./shared/EventContracts";
import "./index.css";

// 如果尚未初始化事件总线，则创建一个(独立运行时)
if (!window.__MFE_EVENT_BUS__) {
  window.__MFE_EVENT_BUS__ = getEventBus();
  console.log("Cart: 独立运行模式，创建事件总线");
}

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
} else {
  console.log("Cart: 在主应用中运行");
}

export {};
