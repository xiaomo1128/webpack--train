import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("Error caught by boundary:", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // 自定义错误UI
      return (
        <div className="error-boundary">
          <h2>出现错误</h2>
          <p>应用加载过程中发生错误。这可能是因为:</p>
          <ul>
            <li>远程应用未启动或不可访问</li>
            <li>远程应用版本不兼容</li>
            <li>网络连接问题</li>
          </ul>
          <details>
            <summary>查看错误详情</summary>
            <pre>{this.state.error?.toString()}</pre>
            <pre>{this.state.errorInfo?.componentStack}</pre>
          </details>
          <button onClick={this.resetError}>重试</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
