import React from "react";
import "./LoadingFallback.css";

const LoadingFallback = () => {
  return (
    <div className="loading-fallback">
      <div className="spinner"></div>
      <p>加载中，请稍候...</p>
    </div>
  );
};

export default LoadingFallback;
