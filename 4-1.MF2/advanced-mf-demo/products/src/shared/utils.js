// 动态注入 reducer 到主应用 store
export const injectReducer = (store, key, reducer) => {
  // 已存在就不需要再注入
  if (!store || !store.injectReducer) {
    console.warn(`Store不支持动态注入或未找到`);
    return false;
  }

  // 避免重复注入
  if (store.asyncReducers && store.asyncReducers[key]) {
    console.log(`Reducer ${key} 已存在，不再重复注入`);
    return true;
  }

  try {
    store.injectReducer(key, reducer);
    console.log(`成功注入 ${key} reducer`);
    return true;
  } catch (error) {
    console.error(`注入 ${key} reducer 失败:`, error);
    return false;
  }
};

// 安全的事件总线访问
export const getEventBus = () => {
  if (!window.__MFE_EVENT_BUS__) {
    console.warn("事件总线未初始化，尝试创建一个新的实例");

    // 如果需要，可以在这里从共享的eventBus导入createEventBus并创建实例
    // 但这种情况应该只在开发期间出现
  }

  return window.__MFE_EVENT_BUS__;
};

// 安全地访问共享store
export const getShellStore = () => {
  if (!window.__SHELL_STORE__) {
    console.warn("主应用Store未找到，可能处于独立运行模式");
  }

  return window.__SHELL_STORE__;
};
