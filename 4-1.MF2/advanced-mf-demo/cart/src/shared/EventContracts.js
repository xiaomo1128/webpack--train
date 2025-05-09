// 该文件应该被所有微应用共享

// 定义所有事件名称
export const EventNames = {
  // 产品相关事件
  PRODUCT_ADDED_TO_CART: "product-added-to-cart",
  ADD_TO_CART: "add-to-cart",
  REMOVE_FROM_CART: "remove-from-cart",
  UPDATE_CART_QUANTITY: "update-cart-quantity",

  // 产品状态相关事件
  PRODUCTS_LOADED: "products-loaded",
  PRODUCTS_LOADING_ERROR: "products-loading-error",
  PRODUCT_FILTER_CHANGED: "product-filter-changed",

  // 用户相关事件
  USER_LOGGED_IN: "user-logged-in",
  USER_LOGGED_OUT: "user-logged-out",
  USER_REGISTERED: "user-registered",

  // 主题相关事件
  THEME_CHANGED: "theme-changed",

  // 系统事件
  MFE_ERROR: "mfe-error",
};

// 定义事件数据结构
export const EventDataSchemas = {
  [EventNames.ADD_TO_CART]: {
    product: {
      id: "required|number|string",
      title: "required|string",
      price: "required|number",
      image: "string",
      description: "string",
      category: "string",
    },
    quantity: "required|number",
  },

  [EventNames.PRODUCT_ADDED_TO_CART]: {
    id: "required|number|string",
    title: "required|string",
    price: "required|number",
    image: "string",
  },

  [EventNames.USER_LOGGED_IN]: {
    id: "required|number|string",
    name: "required|string",
    email: "required|string",
  },

  [EventNames.PRODUCTS_LOADED]: {
    items: "array",
    count: "number",
  },

  [EventNames.PRODUCT_FILTER_CHANGED]: {
    category: "string",
    minPrice: "number",
    maxPrice: "number",
    searchTerm: "string",
  },
};

// 适配器：用于将老版本的事件数据转换为新格式
export const EventAdapters = {
  // 适配添加购物车事件
  [EventNames.ADD_TO_CART]: (data) => {
    // 处理旧式API传参格式
    if (data.product) {
      return data; // 新版格式，直接返回
    }

    // 旧版格式，需要转换
    return {
      product: {
        id: data.id,
        title: data.title,
        price: data.price,
        image: data.image,
        description: data.description,
        category: data.category,
      },
      quantity: data.quantity || 1,
    };
  },
};

// 事件数据验证函数
export const validateEventData = (eventName, data) => {
  const schema = EventDataSchemas[eventName];
  if (!schema) return true; // 没有schema则不验证

  // 适配旧格式
  const adapter = EventAdapters[eventName];
  const adaptedData = adapter ? adapter(data) : data;

  // 验证实现
  const validateField = (value, schemaStr) => {
    const rules = schemaStr.split("|");

    // 必填检查
    if (rules.includes("required") && (value === undefined || value === null)) {
      return false;
    }

    // 类型检查
    if (value !== undefined && value !== null) {
      const allowedTypes = rules.filter((rule) =>
        ["string", "number", "boolean", "object", "array"].includes(rule)
      );
      if (allowedTypes.length > 0) {
        const valueType = Array.isArray(value) ? "array" : typeof value;
        if (!allowedTypes.includes(valueType)) {
          return false;
        }
      }
    }

    return true;
  };

  const validateObject = (obj, schemaObj) => {
    if (!obj || typeof obj !== "object") return false;

    for (const key in schemaObj) {
      const value = obj[key];
      const fieldSchema = schemaObj[key];

      if (typeof fieldSchema === "object") {
        // 嵌套对象验证
        if (!validateObject(value, fieldSchema)) {
          return false;
        }
      } else {
        // 标量字段验证
        if (!validateField(value, fieldSchema)) {
          return false;
        }
      }
    }

    return true;
  };

  return validateObject(adaptedData, schema);
};

// 事件总线封装，支持验证
export const createEventBus = () => {
  const eventBus = {
    on(event, callback) {
      const wrappedCallback = (e) => {
        try {
          callback(e.detail);
        } catch (error) {
          console.error(`处理事件 ${event} 时出错:`, error);
        }
      };

      // 存储原始回调和包装回调的映射，便于之后移除
      if (!this._callbackMaps) {
        this._callbackMaps = new Map();
      }

      if (!this._callbackMaps.has(callback)) {
        this._callbackMaps.set(callback, wrappedCallback);
      }

      window.addEventListener(event, this._callbackMaps.get(callback));
      return this;
    },

    emit(event, data) {
      // 验证事件数据
      if (EventDataSchemas[event] && !validateEventData(event, data)) {
        console.warn(`事件 ${event} 的数据格式不符合规范:`, data);
        // 开发模式下，严格验证可以抛出错误
        // throw new Error(`事件 ${event} 的数据格式不符合规范`);
      }

      // 适配数据格式
      const adapter = EventAdapters[event];
      const adaptedData = adapter ? adapter(data) : data;

      window.dispatchEvent(new CustomEvent(event, { detail: adaptedData }));
      return this;
    },

    remove(event, callback) {
      if (this._callbackMaps && this._callbackMaps.has(callback)) {
        window.removeEventListener(event, this._callbackMaps.get(callback));
        this._callbackMaps.delete(callback);
      } else {
        window.removeEventListener(event, callback);
      }
      return this;
    },
  };

  return eventBus;
};

// 获取事件总线实例，确保全局只有一个实例
export const getEventBus = () => {
  if (!window.__MFE_EVENT_BUS__) {
    window.__MFE_EVENT_BUS__ = createEventBus();
  }
  return window.__MFE_EVENT_BUS__;
};
