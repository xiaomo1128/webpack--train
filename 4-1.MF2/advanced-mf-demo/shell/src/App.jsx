import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addNotification } from "./store/shellSlice";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingFallback from "./components/LoadingFallback";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./App.css";

// 懒加载远程微前端应用页面
const ProductsApp = lazy(() => import("products/ProductsApp"));
const CartApp = lazy(() => import("cart/CartApp"));
const AccountApp = lazy(() => import("account/AccountApp"));

// 注册子应用的Redux store
const registerRemoteStores = (store) => {
  // 这会在每个微前端自己的初始化过程中完成
  window.__SHELL_STORE__ = store;
};

const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.shell.theme);
  const isAuthenticated = useSelector((state) => state.shell.isAuthenticated);

  // 注册全局事件总线，用于应用间通信
  useEffect(() => {
    const eventBus = {
      on(event, callback) {
        window.addEventListener(event, (e) => callback(e.detail));
      },
      emit(event, data) {
        window.dispatchEvent(new CustomEvent(event, { detail: data }));
      },
      remove(event, callback) {
        window.removeEventListener(event, callback);
      },
    };

    window.__MFE_EVENT_BUS__ = eventBus;

    // 设置事件监听
    const handleProductAdded = (product) => {
      dispatch(
        addNotification({
          type: "success",
          message: `${product.title} 已添加到购物车`,
        })
      );
    };

    eventBus.on("product-added-to-cart", handleProductAdded);

    return () => {
      eventBus.remove("product-added-to-cart", handleProductAdded);
    };
  }, [dispatch]);

  return (
    <ThemeProvider value={theme}>
      <BrowserRouter>
        <Layout>
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/products/*" element={<ProductsApp />} />

                <Route path="/cart/*" element={<CartApp />} />

                <Route
                  path="/account/*"
                  element={
                    isAuthenticated ? (
                      <AccountApp />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />

                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
