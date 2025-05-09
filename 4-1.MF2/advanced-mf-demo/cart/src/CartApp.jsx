import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import { injectReducer } from "./utils/dynamicStore";
import { addToCart } from "./store/cartSlice";
import cartReducer from "./store/cartSlice";
import "./CartApp.css";

const CartApp = () => {
  const dispatch = useDispatch();

  // 初始化并注入 Reducer
  useEffect(() => {
    // 将购物车 reducer 注入主应用 store
    const shellStore = window.__SHELL_STORE__;
    if (shellStore) {
      try {
        injectReducer(shellStore, "cart", cartReducer);
        console.log("Cart: 成功注入 cart reducer");
      } catch (error) {
        console.error("Cart: 注入reducer失败:", error);
      }
    } else {
      console.log("Cart: 以独立模式运行，不需要注入reducer");
    }

    // 监听来自其他微前端的添加购物车事件
    const handleAddToCart = (data) => {
      console.log("Cart: 收到添加购物车事件", data);
      try {
        dispatch(addToCart(data));
      } catch (error) {
        console.error("Cart: 处理添加购物车事件失败", error);
      }
    };

    if (window.__MFE_EVENT_BUS__) {
      window.__MFE_EVENT_BUS__.on("add-to-cart", handleAddToCart);
      console.log("Cart: 已注册添加购物车事件监听");
    } else {
      console.warn("Cart: 事件总线未初始化，无法注册事件监听");
    }

    return () => {
      if (window.__MFE_EVENT_BUS__) {
        window.__MFE_EVENT_BUS__.remove("add-to-cart", handleAddToCart);
      }
    };
  }, [dispatch]);

  return (
    <div className="cart-app">
      <Routes>
        <Route path="/" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </div>
  );
};

export default CartApp;
