import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../store/accountSlice";
import "./RegisterPage.css";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.account || {});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // 清除相关错误
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "请输入您的姓名";
    }

    if (!formData.email.trim()) {
      errors.email = "请输入电子邮箱";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "请输入有效的电子邮箱";
    }

    if (!formData.password) {
      errors.password = "请输入密码";
    } else if (formData.password.length < 6) {
      errors.password = "密码长度至少为6个字符";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "两次输入的密码不一致";
    }

    if (!formData.agreeTerms) {
      errors.agreeTerms = "请阅读并同意服务条款";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // 注册
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      const resultAction = await dispatch(register(userData));

      if (register.fulfilled.match(resultAction)) {
        // 登录成功，尝试更新主应用状态
        try {
          const shellActions = await import("shell/store").then(
            (module) => module
          );
          dispatch(shellActions.setUser(resultAction.payload));

          // 通知其他微前端用户已登录
          window.__MFE_EVENT_BUS__?.emit(
            "user-registered",
            resultAction.payload
          );

          // 导航到账户页面
          navigate("/account");
        } catch (error) {
          console.error("无法更新主应用用户状态", error);
        }
      }
    } catch (error) {
      console.error("注册失败", error);
    }
  };

  return (
    <div className="register-page">
      <h1>创建新账户</h1>

      {error && <div className="error-message">{error}</div>}

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">姓名</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={formErrors.name ? "error" : ""}
          />
          {formErrors.name && (
            <div className="field-error">{formErrors.name}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">电子邮箱</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={formErrors.email ? "error" : ""}
          />
          {formErrors.email && (
            <div className="field-error">{formErrors.email}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">密码</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={formErrors.password ? "error" : ""}
          />
          {formErrors.password && (
            <div className="field-error">{formErrors.password}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">确认密码</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={formErrors.confirmPassword ? "error" : ""}
          />
          {formErrors.confirmPassword && (
            <div className="field-error">{formErrors.confirmPassword}</div>
          )}
        </div>

        <div className="form-group-inline">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className={formErrors.agreeTerms ? "error" : ""}
            />
            <span>
              我已阅读并同意<a href="#terms">服务条款</a>和
              <a href="#privacy">隐私政策</a>
            </span>
          </label>
          {formErrors.agreeTerms && (
            <div className="field-error">{formErrors.agreeTerms}</div>
          )}
        </div>

        <button
          type="submit"
          className="register-button"
          disabled={status === "loading"}
        >
          {status === "loading" ? "注册中..." : "注册账户"}
        </button>
      </form>

      <div className="login-link">
        <p>
          已有账户? <Link to="/account/login">登录</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
