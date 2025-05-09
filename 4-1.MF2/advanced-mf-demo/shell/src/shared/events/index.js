// 实现事件总线
window.__MFE_EVENT_BUS__ = {
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
