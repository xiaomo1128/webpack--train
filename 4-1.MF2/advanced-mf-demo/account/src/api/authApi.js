// 模拟API调用

// 模拟用户数据
const mockUsers = [
  {
    id: 1,
    name: "张三",
    email: "zhangsan@example.com",
    password: "password123",
  },
  {
    id: 2,
    name: "李四",
    email: "lisi@example.com",
    password: "password123",
  },
];

// 模拟登录API
export const login = async (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { email, password } = credentials;
      const user = mockUsers.find((user) => user.email === email);

      if (user && user.password === password) {
        // 返回用户信息（不包括密码）
        const { password, ...userInfo } = user;
        resolve(userInfo);
      } else {
        reject(new Error("邮箱或密码不正确"));
      }
    }, 1000);
  });
};

// 模拟注册API
export const register = async (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { email } = userData;
      const existingUser = mockUsers.find((user) => user.email === email);

      if (existingUser) {
        reject(new Error("此邮箱已被注册"));
      } else {
        // 创建新用户
        const newUser = {
          id: mockUsers.length + 1,
          ...userData,
        };

        mockUsers.push(newUser);

        // 返回用户信息（不包括密码）
        const { password, ...userInfo } = newUser;
        resolve(userInfo);
      }
    }, 1000);
  });
};

// 模拟检查登录状态API
export const checkAuthStatus = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 这里应该是检查本地存储中的令牌等
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

      if (isLoggedIn) {
        // 如果已登录，获取当前用户信息
        const userId = localStorage.getItem("userId");
        const user = mockUsers.find((user) => user.id.toString() === userId);

        if (user) {
          const { password, ...userInfo } = user;
          resolve(userInfo);
        } else {
          resolve(null);
        }
      } else {
        resolve(null);
      }
    }, 500);
  });
};

// 模拟登出API
export const logout = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 清除本地存储的登录状态
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userId");
      resolve(true);
    }, 300);
  });
};
