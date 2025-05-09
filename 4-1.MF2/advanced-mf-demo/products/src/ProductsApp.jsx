import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import { fetchProducts } from "./store/productsSlice";
import { injectReducer } from "./utils/dynamicStore";
import productsReducer from "./store/productsSlice";
import "./ProductsApp.css";

const ProductsApp = () => {
  const dispatch = useDispatch();

  // 初始化并注入 Reducer
  useEffect(() => {
    // 确保reducer被注入后再加载数据
    const initializeStore = async () => {
      // 将产品reducer注入主应用store
      const shellStore = window.__SHELL_STORE__;
      let injected = false;

      if (shellStore) {
        try {
          // 注入reducer
          injected = injectReducer(shellStore, "products", productsReducer);
          console.log("Products: 成功注入reducer到Shell应用", injected);
        } catch (error) {
          console.error("Products: 注入reducer失败:", error);
          // 发送错误事件
          if (window.__MFE_EVENT_BUS__) {
            window.__MFE_EVENT_BUS__.emit("mfe-error", {
              module: "products",
              errorMessage: `注入reducer失败: ${error.message}`,
            });
          }
        }
      } else {
        console.log("Products: 以独立模式运行");
      }

      // 无论是否注入成功，都尝试加载数据
      try {
        const result = await dispatch(fetchProducts()).unwrap();
        console.log("Products: 成功加载产品数据");

        // 通知其他微应用产品已加载
        if (window.__MFE_EVENT_BUS__) {
          window.__MFE_EVENT_BUS__.emit("products-loaded", {
            items: result,
            count: result.length,
          });
        }
      } catch (error) {
        console.error("Products: 加载产品数据失败:", error);
        // 发送错误事件
        if (window.__MFE_EVENT_BUS__) {
          window.__MFE_EVENT_BUS__.emit("mfe-error", {
            module: "products",
            errorMessage: `加载产品数据失败: ${error}`,
          });
        }
      }
    };

    initializeStore();
  }, [dispatch]);

  // 检查store是否准备好
  const storeReady = useSelector((state) => !!state.products);

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
