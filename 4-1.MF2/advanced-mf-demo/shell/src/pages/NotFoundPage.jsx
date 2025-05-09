import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h1>404 - 页面未找到</h1>
      <p>抱歉，您访问的页面不存在。</p>
      <Link to="/" className="back-to-home">
        返回首页
      </Link>
    </div>
  );
};

export default NotFoundPage;
