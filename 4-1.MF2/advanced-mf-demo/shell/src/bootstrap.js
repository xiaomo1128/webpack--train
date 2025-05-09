import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import { getEventBus } from "./shared/EventContracts";
import "./index.css";

// 初始化全局事件总线
window.__MFE_EVENT_BUS__ = getEventBus();

// 暴露全局store给微应用
window.__SHELL_STORE__ = store;

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
