import React, { Suspense, useState } from "react";

// 延迟加载远程组件
const RemoteButton = React.lazy(() => import("remote/Button"));
const RemoteCard = React.lazy(() => import("remote/Card"));

// 本地组件
const LocalButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "#007bff",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
};

function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="host-container">
      <h1>基座应用 (Host)</h1>
      <p>这是基座应用，它通过 Module Federation 集成了远程组件</p>

      <div className="component-section">
        <h2>本地组件</h2>
        <LocalButton onClick={handleClick}>
          本地按钮 (点击次数: {count})
        </LocalButton>
      </div>

      <div className="component-section">
        <h2>远程组件</h2>
        <p>以下组件从远程应用加载:</p>

        <div className="components-container">
          <Suspense fallback={<div>加载按钮中...</div>}>
            <RemoteButton onClick={() => alert("远程按钮被点击!")}>
              远程按钮
            </RemoteButton>
          </Suspense>

          <Suspense fallback={<div>加载卡片中...</div>}>
            <RemoteCard
              title="来自远程应用的卡片"
              description="这个卡片组件是从远程应用动态加载的。Module Federation 使微前端架构变得简单。"
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default App;
