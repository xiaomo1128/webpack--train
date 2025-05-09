// 创建文件：/shared/eventBus.js
export const MicroFrontendEvents = {
  // 产品相关事件
  PRODUCT_ADDED_TO_CART: "product-added-to-cart",
  ADD_TO_CART: "add-to-cart",

  // 用户相关事件
  USER_LOGGED_IN: "user-logged-in",
  USER_LOGGED_OUT: "user-logged-out",
  USER_REGISTERED: "user-registered",

  // 主题相关事件
  THEME_CHANGED: "theme-changed",

  // 系统事件
  MFE_ERROR: "mfe-error",
};

// 创建事件总线
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
