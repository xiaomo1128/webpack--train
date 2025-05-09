import accountReducer from "./accountSlice";

// 导出 reducer 以便主应用可以使用
export default accountReducer;

// 导出额外的 actions 如果需要在主应用中使用
export * from "./accountSlice";
