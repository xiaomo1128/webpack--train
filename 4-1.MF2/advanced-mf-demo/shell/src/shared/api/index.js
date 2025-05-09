// 在shell中实现API
window.MicroFrontendAPI = {
  shell: {
    notifications: {
      add: (payload) => store.dispatch(addNotification(payload)),
      remove: (id) => store.dispatch(removeNotification(id)),
    },
    theme: {
      current: () => store.getState().shell.theme,
      toggle: () =>
        store.dispatch(
          setTheme(store.getState().shell.theme === "light" ? "dark" : "light")
        ),
    },
    auth: {
      getCurrentUser: () => store.getState().shell.user,
      isAuthenticated: () => store.getState().shell.isAuthenticated,
    },
  },
};
