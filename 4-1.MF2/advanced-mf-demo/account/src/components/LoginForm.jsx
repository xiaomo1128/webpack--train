import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/accountSlice";
import { EventNames } from "../shared/EventContracts";
import "./LoginForm.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.account || {});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(login(formData));

      if (login.fulfilled.match(resultAction)) {
        // 登录成功，获取用户数据
        const user = resultAction.payload;

        // 通过事件总线通知其他微应用用户已登录
        if (window.__MFE_EVENT_BUS__) {
          try {
            window.__MFE_EVENT_BUS__.emit(EventNames.USER_LOGGED_IN, user);
            console.log("Account: 发送用户登录事件");
          } catch (error) {
            console.error("Account: 发送用户登录事件失败", error);
          }
        }

        // 导航到账户页面
        navigate("/account");
      }
    } catch (error) {
      console.error("登录失败", error);
    }
  };

  return (
    <div className="login-form-container">
      <h2>登录账户</h2>
      {error && <div className="error-message">{error}</div>}

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">电子邮箱</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">密码</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group-inline">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <span>记住我</span>
          </label>
          <Link to="/account/forgot-password" className="forgot-password">
            忘记密码?
          </Link>
        </div>

        <button
          type="submit"
          className="login-button"
          disabled={status === "loading"}
        >
          {status === "loading" ? "登录中..." : "登录"}
        </button>
      </form>

      <div className="register-link">
        <p>
          还没有账户? <Link to="/account/register">注册</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;