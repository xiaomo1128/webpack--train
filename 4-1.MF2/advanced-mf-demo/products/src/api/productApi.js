// 模拟产品数据
const mockProducts = [
  {
    id: 1,
    title: "iPhone 15 Pro",
    price: 8999,
    description:
      "Apple 最新旗舰智能手机，搭载 A17 Pro 芯片，配备专业级相机系统。",
    category: "smartphones",
    image: "https://via.placeholder.com/400x400?text=iPhone+15",
  },
  {
    id: 2,
    title: "MacBook Pro 14",
    price: 14999,
    description:
      "搭载 M3 Pro 芯片的专业级笔记本电脑，拥有出色的性能和电池续航。",
    category: "laptops",
    image: "https://via.placeholder.com/400x400?text=MacBook+Pro",
  },
  {
    id: 3,
    title: "iPad Air",
    price: 4999,
    description: "轻薄设计的中端平板电脑，适合创意工作和娱乐。",
    category: "tablets",
    image: "https://via.placeholder.com/400x400?text=iPad+Air",
  },
  {
    id: 4,
    title: "AirPods Pro",
    price: 1999,
    description: "主动降噪无线耳机，提供沉浸式音频体验。",
    category: "audio",
    image: "https://via.placeholder.com/400x400?text=AirPods+Pro",
  },
  {
    id: 5,
    title: "Apple Watch Series 9",
    price: 3299,
    description: "功能强大的智能手表，可监测健康数据并保持连接。",
    category: "wearables",
    image: "https://via.placeholder.com/400x400?text=Apple+Watch",
  },
  {
    id: 6,
    title: "Samsung Galaxy S23",
    price: 6999,
    description: "三星旗舰智能手机，配备高分辨率相机和强大处理器。",
    category: "smartphones",
    image: "https://via.placeholder.com/400x400?text=Galaxy+S23",
  },
  {
    id: 7,
    title: "Dell XPS 13",
    price: 9999,
    description: "轻薄高性能的Windows笔记本电脑，配备边缘到边缘显示屏。",
    category: "laptops",
    image: "https://via.placeholder.com/400x400?text=Dell+XPS",
  },
  {
    id: 8,
    title: "索尼WH-1000XM5",
    price: 2699,
    description: "顶级无线降噪耳机，提供卓越的音质和舒适度。",
    category: "audio",
    image: "https://via.placeholder.com/400x400?text=Sony+WH1000XM5",
  },
];

// 模拟API调用
export const fetchProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 500);
  });
};

export const fetchProductById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = mockProducts.find((product) => product.id === Number(id));
      if (product) {
        resolve(product);
      } else {
        reject(new Error("Product not found"));
      }
    }, 300);
  });
};
