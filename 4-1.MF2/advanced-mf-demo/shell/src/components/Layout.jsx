import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setTheme, logout } from "../store/shellSlice";
import NotificationCenter from "./NotificationCenter";
import "./Layout.css";

const Layout = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, user, theme } = useSelector((state) => state.shell);
  const cartItems = useSelector((state) => state.cart?.items || []);
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    dispatch(setTheme(newTheme));
  };

  const handleLogout = () => {
    dispatch(logout());
    window.__MFE_EVENT_BUS__?.emit("user-logged-out");
  };

  return (
    <div className={`app-container ${theme}`}>
      <header className="app-header">
        <div className="logo">
          <Link to="/">MicroFrontend Shop</Link>
        </div>

        <nav className="main-nav">
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            首页
          </Link>
          <Link
            to="/products"
            className={
              location.pathname.startsWith("/products") ? "active" : ""
            }
          >
            商品
          </Link>
          <Link
            to="/cart"
            className={location.pathname.startsWith("/cart") ? "active" : ""}
          >
            购物车{" "}
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </Link>
          {isAuthenticated && (
            <Link
              to="/account"
              className={
                location.pathname.startsWith("/account") ? "active" : ""
              }
            >
              我的账户
            </Link>
          )}
        </nav>

        <div className="header-controls">
          <button
            className="theme-toggle"
            onClick={handleThemeToggle}
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } theme`}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {isAuthenticated ? (
            <div className="user-controls">
              <span className="user-name">你好，{user?.name}</span>
              <button className="logout-button" onClick={handleLogout}>
                退出
              </button>
            </div>
          ) : (
            <Link to="/account/login" className="login-button">
              登录
            </Link>
          )}
        </div>
      </header>

      <main className="app-content">{children}</main>

      <NotificationCenter />

      <footer className="app-footer">
        <p>© 2025 微前端商城演示 - 基于 Module Federation</p>
      </footer>
    </div>
  );
};

export default Layout;
