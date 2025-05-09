import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import { fetchProducts } from "./store/productsSlice";
import { injectReducer } from "./utils/dynamicStore";
import productsReducer from "./store/productsSlice";
import "./ProductsApp.css";

const ProductsApp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 初始化并注入 Reducer
  useEffect(() => {
    // 将产品reducer注入主应用store
    const shellStore = window.__SHELL_STORE__;
    if (shellStore) {
      injectReducer(shellStore, "products", productsReducer);
    }

    // 加载产品数据
    dispatch(fetchProducts());
  }, [dispatch]);

  // 监听主题变化
  useEffect(() => {
    const handleThemeChange = ({ detail }) => {
      document.documentElement.dataset.theme = detail;
    };

    window.__MFE_EVENT_BUS__?.on("theme-changed", handleThemeChange);

    return () => {
      window.__MFE_EVENT_BUS__?.remove("theme-changed", handleThemeChange);
    };
  }, []);

  return (
    <div className="products-app">
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/:productId" element={<ProductDetailPage />} />
      </Routes>
    </div>
  );
};

export default ProductsApp;
