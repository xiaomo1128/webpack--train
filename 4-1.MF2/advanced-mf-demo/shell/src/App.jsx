import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addNotification, setTheme, setUser } from "./store/shellSlice";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingFallback from "./components/LoadingFallback";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import { ThemeProvider } from "./contexts/ThemeContext";
import { EventNames } from "./shared/EventContracts";
import "./App.css";

// 懒加载远程微前端应用页面
const ProductsApp = lazy(() => import("products/ProductsApp"));
const CartApp = lazy(() => import("cart/CartApp"));
const AccountApp = lazy(() => import("account/AccountApp"));

const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.shell.theme);
  const isAuthenticated = useSelector((state) => state.shell.isAuthenticated);

  // 注册全局事件监听
  useEffect(() => {
    const eventBus = window.__MFE_EVENT_BUS__;
    if (!eventBus) {
      console.error("Shell: 事件总线未初始化");
      return;
    }

    // 处理产品添加到购物车事件
    const handleProductAdded = (product) => {
      dispatch(
        addNotification({
          type: "success",
          message: `${product.title} 已添加到购物车`,
        })
      );
    };

    // 处理主题变更事件
    const handleThemeChanged = (newTheme) => {
      dispatch(setTheme(newTheme));
    };

    // 处理用户登录事件
    const handleUserLoggedIn = (user) => {
      dispatch(setUser(user));
    };

    // 处理用户登出事件
    const handleUserLoggedOut = () => {
      dispatch({ type: "shell/logout" });
    };

    // 处理微前端错误事件
    const handleMfeError = (errorData) => {
      dispatch(
        addNotification({
          type: "error",
          message: `模块 ${errorData.module} 发生错误: ${errorData.errorMessage}`,
        })
      );

      console.error("微前端错误:", errorData);
    };

    // 注册所有事件监听
    eventBus.on(EventNames.PRODUCT_ADDED_TO_CART, handleProductAdded);
    eventBus.on(EventNames.THEME_CHANGED, handleThemeChanged);
    eventBus.on(EventNames.USER_LOGGED_IN, handleUserLoggedIn);
    eventBus.on(EventNames.USER_LOGGED_OUT, handleUserLoggedOut);
    eventBus.on(EventNames.MFE_ERROR, handleMfeError);

    // 清理函数
    return () => {
      eventBus.remove(EventNames.PRODUCT_ADDED_TO_CART, handleProductAdded);
      eventBus.remove(EventNames.THEME_CHANGED, handleThemeChanged);
      eventBus.remove(EventNames.USER_LOGGED_IN, handleUserLoggedIn);
      eventBus.remove(EventNames.USER_LOGGED_OUT, handleUserLoggedOut);
      eventBus.remove(EventNames.MFE_ERROR, handleMfeError);
    };
  }, [dispatch]);

  return (
    <ThemeProvider value={theme}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route
              path="/products/*"
              element={
                <ErrorBoundary moduleName="products">
                  <Suspense
                    fallback={<LoadingFallback message="加载产品模块..." />}
                  >
                    <ProductsApp />
                  </Suspense>
                </ErrorBoundary>
              }
            />

            <Route
              path="/cart/*"
              element={
                <ErrorBoundary moduleName="cart">
                  <Suspense
                    fallback={<LoadingFallback message="加载购物车模块..." />}
                  >
                    <CartApp />
                  </Suspense>
                </ErrorBoundary>
              }
            />

            <Route
              path="/account/*"
              element={
                <ErrorBoundary moduleName="account">
                  <Suspense
                    fallback={<LoadingFallback message="加载账户模块..." />}
                  >
                    {isAuthenticated ? (
                      <AccountApp />
                    ) : (
                      <Navigate to="/account/login" replace />
                    )}
                  </Suspense>
                </ErrorBoundary>
              }
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
