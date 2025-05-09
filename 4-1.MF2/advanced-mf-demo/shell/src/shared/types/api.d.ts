// src/shared/api.d.ts (类型定义文件)
interface MicroFrontendAPI {
  shell: {
    notifications: {
      add: (payload: { type: string; message: string }) => void;
      remove: (id: string) => void;
    };
    theme: {
      current: () => "light" | "dark";
      toggle: () => void;
    };
    auth: {
      getCurrentUser: () => User | null;
      isAuthenticated: () => boolean;
    };
  };
  products: {
    getPopularProducts: () => Promise<Product[]>;
    // 其他产品相关API
  };
  cart: {
    getItems: () => CartItem[];
    addItem: (product: Product, quantity: number) => void;
    // 其他购物车相关API
  };
}

declare global {
  interface Window {
    MicroFrontendAPI?: MicroFrontendAPI;
  }
}
