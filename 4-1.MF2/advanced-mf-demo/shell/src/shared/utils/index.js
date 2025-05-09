window.MicroFrontendAPI.shell.store = {
  getState: () => {
    const state = store.getState();
    return {
      theme: state.shell.theme,
      isAuthenticated: state.shell.isAuthenticated,
      // 只暴露必要的状态，避免暴露敏感信息
    };
  },
  // 不直接暴露dispatch，而是通过API契约暴露特定的action
};
