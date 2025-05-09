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

```
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
