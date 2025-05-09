import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import OrdersPage from "./pages/OrdersPage";
import AddressesPage from "./pages/AddressesPage";
import WishlistPage from "./pages/WishlistPage";
import { injectReducer } from "./utils/dynamicStore";
import accountReducer from "./store/accountSlice";
import "./AccountApp.css";

// 需要身份验证的路由组件
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.shell?.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/account/login" replace />;
  }

  return children;
};

const AccountApp = () => {
  // 初始化并注入 Reducer
  useEffect(() => {
    // 将账户 reducer 注入主应用 store
    const shellStore = window.__SHELL_STORE__;
    if (shellStore) {
      injectReducer(shellStore, "account", accountReducer);
    }
  }, []);

  return (
    <div className="account-app">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addresses"
          element={
            <ProtectedRoute>
              <AddressesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <WishlistPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default AccountApp;
