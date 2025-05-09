import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import { injectReducer } from "./utils/dynamicStore";
import cartReducer from "./store/cartSlice";
import "./CartApp.css";

const CartApp = () => {
  const dispatch = useDispatch();

  // 初始化并注入 Reducer
  useEffect(() => {
    // 将购物车 reducer 注入主应用 store
    const shellStore = window.__SHELL_STORE__;
    if (shellStore) {
      injectReducer(shellStore, "cart", cartReducer);
    }

    // 监听来自其他微前端的添加购物车事件
    const handleAddToCart = (data) => {
      import("./store").then(({ addToCart }) => {
        dispatch(addToCart(data));
      });
    };

    window.__MFE_EVENT_BUS__?.on("add-to-cart", handleAddToCart);

    return () => {
      window.__MFE_EVENT_BUS__?.remove("add-to-cart", handleAddToCart);
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
