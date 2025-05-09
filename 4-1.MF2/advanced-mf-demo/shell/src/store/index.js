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
    store.asyncReducers[key] = reducer;
    store.replaceReducer(createReducer(store.asyncReducers));
    return store;
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
