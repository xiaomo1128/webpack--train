import React from "react";
import { MicroFrontendEvents } from "../shared/eventBus";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      isRetrying: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("微前端加载错误:", error, errorInfo);

    // 通过事件总线广播错误
    if (window.__MFE_EVENT_BUS__) {
      window.__MFE_EVENT_BUS__.emit(MicroFrontendEvents.MFE_ERROR, {
        module: this.props.moduleName || "unknown",
        errorMessage: error.message,
        stackTrace: error.stack,
        componentStack: errorInfo.componentStack,
      });
    }
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      isRetrying: true,
    });

    // 2秒后恢复isRetrying状态
    setTimeout(() => {
      this.setState({ isRetrying: false });
    }, 2000);
  };

  render() {
    if (this.state.hasError) {
      // 自定义错误UI
      return (
        <div className="error-boundary">
          <h2>加载模块时出现错误</h2>
          <p>可能的原因:</p>
          <ul>
            <li>模块服务未启动（请确认相关服务是否运行）</li>
            <li>网络连接问题</li>
            <li>模块版本不兼容</li>
          </ul>

          {this.props.fallback ? (
            this.props.fallback
          ) : (
            <div className="error-actions">
              <button
                onClick={this.resetError}
                disabled={this.state.isRetrying}
              >
                {this.state.isRetrying ? "加载中..." : "重试"}
              </button>

              {this.props.moduleName === "products" && (
                <a href="/" className="return-home">
                  返回首页
                </a>
              )}

              <details>
                <summary>查看详细错误</summary>
                <p className="error-message">{this.state.error?.toString()}</p>
                <pre className="error-stack">
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
