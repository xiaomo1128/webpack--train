// 微前端通用工具函数

/**
 * 安全地获取Shell应用的Store
 */
export const getShellStore = () => {
  if (!window.__SHELL_STORE__) {
    console.warn("Shell Store未找到，可能处于独立运行模式");
    return null;
  }
  return window.__SHELL_STORE__;
};

/**
 * 安全地注入reducer到Shell Store
 * @param {string} key - Reducer的名称
 * @param {function} reducer - Reducer函数
 * @return {boolean} - 是否成功注入
 */
export const injectReducerToShell = (key, reducer) => {
  const shellStore = getShellStore();

  if (!shellStore) {
    return false;
  }

  // 避免重复注入
  if (shellStore.asyncReducers && shellStore.asyncReducers[key]) {
    console.log(`Reducer ${key} 已存在，不再重复注入`);
    return true;
  }

  if (typeof shellStore.injectReducer !== "function") {
    console.error("Shell Store不支持动态注入");
    return false;
  }

  try {
    shellStore.injectReducer(key, reducer);
    console.log(`成功注入 ${key} reducer`);
    return true;
  } catch (error) {
    console.error(`注入 ${key} reducer 失败:`, error);
    return false;
  }
};

/**
 * 检测微应用是否在Shell环境中运行
 */
export const isRunningInShell = () => {
  return !!window.__SHELL_STORE__;
};

/**
 * 安全地获取事件总线
 */
export const getEventBus = () => {
  return window.__MFE_EVENT_BUS__;
};

/**
 * 导航到指定路径
 * @param {string} path - 要导航到的路径
 */
export const navigateTo = (path) => {
  if (window.location.pathname !== path) {
    window.history.pushState({}, "", path);
    // 触发路由变化事件，以便React Router检测到变化
    window.dispatchEvent(new PopStateEvent("popstate"));
  }
};

/**
 * 记录微前端错误
 * @param {string} moduleName - 发生错误的模块名称
 * @param {Error|string} error - 错误对象或消息
 */
export const logMfeError = (moduleName, error) => {
  const errorMessage = error instanceof Error ? error.message : error;
  const stack = error instanceof Error ? error.stack : null;

  console.error(`[${moduleName}] 错误:`, errorMessage);

  const eventBus = getEventBus();
  if (eventBus) {
    eventBus.emit("mfe-error", {
      module: moduleName,
      errorMessage,
      stack,
    });
  }
};
