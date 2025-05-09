/**
 * 安全地访问Redux状态
 * @param {Object} state - Redux状态
 * @param {string} path - 点分隔的路径，如 "products.items"
 * @param {any} defaultValue - 默认值，如果路径不存在
 * @returns {any} 路径对应的值或默认值
 */
export const safeSelect = (state, path, defaultValue = undefined) => {
  if (!state) return defaultValue;

  const keys = path.split(".");
  let current = state;

  for (const key of keys) {
    if (
      current === null ||
      current === undefined ||
      typeof current !== "object"
    ) {
      return defaultValue;
    }
    current = current[key];
  }

  return current !== undefined ? current : defaultValue;
};

/**
 * 创建一个安全的选择器函数
 * @param {Function} selector - 原始选择器函数
 * @param {any} defaultValue - 当选择器出错时返回的默认值
 * @returns {Function} 安全的选择器函数
 */
export const createSafeSelector = (selector, defaultValue) => {
  return (state, ...args) => {
    try {
      return selector(state, ...args) ?? defaultValue;
    } catch (error) {
      console.error("选择器错误:", error);
      return defaultValue;
    }
  };
};
