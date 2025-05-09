export const MicroFrontendEvents = {
  // 购物车事件
  ADD_TO_CART: "add-to-cart",
  PRODUCT_ADDED: "product-added-to-cart",
  CART_UPDATED: "cart-updated",

  // 用户事件
  USER_LOGIN: "user-login",
  USER_LOGOUT: "user-logout",

  // 主题事件
  THEME_CHANGED: "theme-changed",

  // 通知事件
  SHOW_NOTIFICATION: "show-notification",

  // 错误事件
  MFE_ERROR: "mfe-error",
};

// 定义事件数据结构
export const EventSchemas = {
  [MicroFrontendEvents.ADD_TO_CART]: {
    product: {
      id: "string/number",
      title: "string",
      price: "number",
      image: "string",
      description: "string",
      category: "string",
    },
    quantity: "number",
  },
};
