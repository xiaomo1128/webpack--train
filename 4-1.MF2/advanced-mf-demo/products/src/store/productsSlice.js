import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts as fetchProductsApi } from "../api/productApi";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchProductsApi();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    filter: {
      category: "all",
      minPrice: 0,
      maxPrice: 1000,
      searchTerm: "",
    },
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    resetFilter: (state) => {
      state.filter = {
        category: "all",
        minPrice: 0,
        maxPrice: 1000,
        searchTerm: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setFilter, resetFilter } = productsSlice.actions;

// 选择器
export const selectAllProducts = (state) => state.products.items;
export const selectFilteredProducts = (state) => {
  const { items, filter } = state.products;
  return items.filter((product) => {
    const matchesCategory =
      filter.category === "all" || product.category === filter.category;
    const matchesPrice =
      product.price >= filter.minPrice && product.price <= filter.maxPrice;
    const matchesSearch =
      filter.searchTerm === "" ||
      product.title.toLowerCase().includes(filter.searchTerm.toLowerCase());
    return matchesCategory && matchesPrice && matchesSearch;
  });
};

export const selectProductById = (state, productId) =>
  state.products.items.find((product) => product.id === productId);

export default productsSlice.reducer;
