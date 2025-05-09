import { configureStore, combineReducers } from "@reduxjs/toolkit";
import shellReducer from "./shellSlice";

// 创建一个根reducer，支持动态注入reducer
const staticReducers = {
  shell: shellReducer,
};

export const setupStore = () => {
  const store = configureStore({
    reducer: createReducer(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    devTools: process.env.NODE_ENV !== "production",
  });

  // 添加动态reducers注入能力
  store.asyncReducers = {};
  store.injectReducer = (key, reducer) => {
    // 确保异步reducers初始化
    if (!store.asyncReducers) {
      store.asyncReducers = {};
    }

    // 检查reducer是否已存在
    if (store.asyncReducers[key]) {
      console.log(`Reducer ${key} 已存在，跳过注入`);
      return true;
    }

    try {
      // 保存reducer引用
      store.asyncReducers[key] = reducer;

      // 重建根reducer
      store.replaceReducer(createReducer(store.asyncReducers));

      // 初始化该reducer的状态，触发一个初始化action
      store.dispatch({ type: `${key}/initialized` });

      console.log(`成功注入并初始化 ${key} reducer`);
      return true;
    } catch (error) {
      console.error(`注入 ${key} reducer 失败:`, error);
      return false;
    }
  };

  // 暴露store给其他微前端应用
  window.__SHELL_STORE__ = store;

  return store;
};

function createReducer(asyncReducers = {}) {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });
}

const store = setupStore();
export default store;
