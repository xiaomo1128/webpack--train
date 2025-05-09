import React from "react";

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>欢迎来到微前端商城</h1>
      <p>这是一个基于 Module Federation 构建的微前端演示项目</p>
      <div className="features">
        <div className="feature">
          <h3>商品浏览</h3>
          <p>浏览我们的精选商品</p>
          <a href="/products">查看商品</a>
        </div>
        <div className="feature">
          <h3>购物车</h3>
          <p>管理您的购物车</p>
          <a href="/cart">我的购物车</a>
        </div>
        <div className="feature">
          <h3>用户中心</h3>
          <p>管理您的账户和订单</p>
          <a href="/account">进入账户</a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
