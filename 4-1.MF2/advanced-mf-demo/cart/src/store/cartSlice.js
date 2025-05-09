import { createSlice } from "@reduxjs/toolkit";

const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : { items: [], lastUpdated: null };
  } catch (error) {
    console.error("Error loading cart from storage:", error);
    return { items: [], lastUpdated: null };
  }
};

const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to storage:", error);
  }
};

const initialState = loadCartFromStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity,
        });
      }

      state.lastUpdated = new Date().toISOString();
      saveCartToStorage(state);
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
      state.lastUpdated = new Date().toISOString();
      saveCartToStorage(state);
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.id === productId);

      if (item) {
        item.quantity = Math.max(1, quantity); // 确保数量至少为1
      }

      state.lastUpdated = new Date().toISOString();
      saveCartToStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.lastUpdated = new Date().toISOString();
      saveCartToStorage({ items: [], lastUpdated: state.lastUpdated });
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

// 选择器
export const selectCartItems = (state) => state.cart?.items || [];
export const selectCartTotal = (state) =>
  (state.cart?.items || []).reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
export const selectCartItemCount = (state) =>
  (state.cart?.items || []).reduce((count, item) => count + item.quantity, 0);

export default cartSlice.reducer;
