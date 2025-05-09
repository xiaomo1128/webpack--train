import React from "react";
import LoginForm from "../components/LoginForm";
import "./LoginPage.css";

const LoginPage = () => {
  return (
    <div className="login-page">
      <h1>登录账户</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
