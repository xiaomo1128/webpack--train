// 创建文件：/shared/contracts.js
export const EventSchemas = {
  // 产品相关事件
  [MicroFrontendEvents.ADD_TO_CART]: {
    product: {
      id: "number/string",
      title: "string",
      price: "number",
      image: "string",
    },
    quantity: "number",
  },

  // 用户相关事件
  [MicroFrontendEvents.USER_LOGGED_IN]: {
    id: "number/string",
    name: "string",
    email: "string",
  },
};

// 验证事件数据格式
export const validateEventData = (eventName, data) => {
  const schema = EventSchemas[eventName];
  if (!schema) return true; // 没有schema则默认通过

  // 简单验证实现
  const validate = (obj, schema) => {
    if (!obj || typeof obj !== "object") return false;

    for (const key in schema) {
      if (typeof schema[key] === "object") {
        if (!validate(obj[key], schema[key])) return false;
      } else {
        const expectedTypes = schema[key].split("/");
        if (!expectedTypes.includes(typeof obj[key])) return false;
      }
    }
    return true;
  };

  return validate(data, schema);
};
