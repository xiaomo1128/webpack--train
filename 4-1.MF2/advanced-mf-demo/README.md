# 高级 Module Federation 示例

这个高级示例包含以下特性：
- 多个微前端应用（主应用 + 3个子应用）
- 共享状态管理（Redux）
- 共享路由（React Router）
- 动态远程加载策略
- 组件级和应用级联邦
- 错误处理和降级策略
- 事件通信机制

## 项目结构

```bash
advanced-mf-demo/
├── shell/                     # 主应用（shell）
├── products/                  # 产品模块
├── cart/                      # 购物车模块
└── account/                   # 用户账户模块
```

## 5. 辅助工具代码

### src/utils/dynamicStore.js（所有子应用共用）

# 问题

- webpack 模块联邦 加载是异步的？
- 微前端架构中的典型循环依赖如何解决？

## 理想的微前端架构原则
在选择最佳方案前，我们需要牢记微前端架构的核心原则：

- 松耦合：微应用之间应尽可能减少直接依赖
- 自治性：每个微应用应能独立开发、测试和部署
- 技术栈无关：各微应用可使用不同的技术栈
- 明确的边界：清晰定义各微应用的职责范围
- 可独立运行：理想情况下每个微应用都可脱离其他应用独立运行

### 1. 直接模块导入(Module Federation) 
```javascript
// 直接导入其他微应用的模块
import { addNotification } from 'shell/shellSlice';
```
- 优点：
    - 直观、类似传统单体应用的开发体验
    - 类型安全(如果使用TypeScript)
- 缺点：
    - ⚠️ 容易形成循环依赖，正如你遇到的问题
    - 强耦合，破坏了微前端的自治原则
    - 需要严格的依赖启动顺序
    - 技术栈绑定，难以切换框架
    - 版本兼容性问题

### 2. 全局事件总线
```javascript
// 发送事件
window.__MFE_EVENT_BUS__.emit('product-added-to-cart', { id: 1, name: 'Product' });

// 监听事件
window.__MFE_EVENT_BUS__.on('product-added-to-cart', (product) => {
  // 处理事件
});
```
- 优点：
    - 松耦合，发送者不需要知道接收者的实现细节
    - 支持多个订阅者
    - 技术栈无关
    - 不依赖启动顺序
- 缺点：
    - 缺乏类型安全
    - 可能导致"事件地狱"，难以追踪和调试
    - 需要约定事件名称和格式

### 3. 全局状态/Store共享
```javascript
// 在Shell中创建并共享store
window.__SHELL_STORE__ = store;

// 在微应用中使用
window.__SHELL_STORE__.dispatch({
  type: 'shell/addNotification',
  payload: { type: 'success', message: '...' }
});
```
- 优点：
    - 集中式状态管理
    - 适合需要共享状态的场景
    - 状态变更可追踪
- 缺点：
    - 对状态库有依赖(如Redux)
    - 可能导致状态管理复杂化
    - 仍存在一定耦合

### 4. Props下发
```javascript
// Shell中向微应用传递回调
<Route path="/products/*" element={
  <ProductsApp 
    addNotification={(payload) => dispatch(addNotification(payload))} 
  />
} />

// 微应用中使用回调
function ProductsApp({ addNotification }) {
  const handleClick = () => {
    addNotification({ message: '...' });
  };
}
```
- 优点：
    - 清晰的接口契约
    - 符合React数据流向
    - 便于测试
- 缺点：
    - 仅适用于React等支持Props的框架
    - 可能导致"props钻取"问题
    - 不适合复杂通信场景

### 5. 自定义API/契约接口
```javascript
// 定义清晰的契约接口
window.MicroFrontendAPI = {
  shell: {
    notifications: {
      add: (payload) => { /* 实现 */ },
      remove: (id) => { /* 实现 */ }
    },
    auth: {
      getCurrentUser: () => { /* 实现 */ },
      logout: () => { /* 实现 */ }
    }
  }
};

// 微应用中使用
if (window.MicroFrontendAPI?.shell.notifications) {
  window.MicroFrontendAPI.shell.notifications.add({
    type: 'success',
    message: '...'
  });
}
```
- 优点：
    - 定义明确的集成点和契约
    - 更好的版本控制和向后兼容性
    - 可以添加类型定义
    - 架构更清晰
- 缺点：
    - 需要额外的`契约`维护
    - 仍是全局对象，但比无结构的事件总线`更好管理`

### 推荐方案: 结合`事件总线和API契约`的优点

1. 建立通信契约文档：明确定义各个微应用可以暴露和消费的API
2. 移除循环依赖：避免使用Module Federation直接导入微应用间的模块
3. 设置基础设施代码：
```bash
shared/
├── api/             # 自定义API契约实现
├── events/          # 事件总线实现
├── types/           # 类型定义
└── utils/           # 通用工具函数
```
