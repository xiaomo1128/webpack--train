// 动态注入 reducer 到主应用 store
export const injectReducer = (store, key, reducer) => {
  // 已存在就不需要再注入
  if (store.asyncReducers && store.asyncReducers[key]) {
    return;
  }

  if (store.injectReducer) {
    store.injectReducer(key, reducer);
    return true;
  }

  return false;
};

// 动态加载远程模块
export const loadRemoteModule = async (scope, module) => {
  // 初始化共享作用域
  await __webpack_init_sharing__("default");

  // 获取容器
  const container = window[scope];
  if (!container) {
    throw new Error(`远程容器 ${scope} 不存在`);
  }

  // 初始化容器
  await container.init(__webpack_share_scopes__.default);

  // 获取工厂函数
  const factory = await container.get(module);

  // 执行工厂函数获取实际模块
  return factory();
};

// 事件总线
export const createEventBus = () => {
  return {
    on(event, callback) {
      window.addEventListener(event, (e) => callback(e.detail));
    },
    emit(event, data) {
      window.dispatchEvent(new CustomEvent(event, { detail: data }));
    },
    remove(event, callback) {
      window.removeEventListener(event, callback);
    },
  };
};
