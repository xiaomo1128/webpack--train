import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login as loginApi, register as registerApi } from "../api/authApi";

export const login = createAsyncThunk(
  "account/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const user = await loginApi(credentials);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  "account/register",
  async (userData, { rejectWithValue }) => {
    try {
      const user = await registerApi(userData);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState: {
    status: "idle",
    error: null,
    orders: [],
    addresses: [],
    wishlist: [],
  },
  reducers: {
    addAddress: (state, action) => {
      state.addresses.push(action.payload);
    },
    updateAddress: (state, action) => {
      const { id, address } = action.payload;
      const index = state.addresses.findIndex((addr) => addr.id === id);
      if (index !== -1) {
        state.addresses[index] = { ...state.addresses[index], ...address };
      }
    },
    removeAddress: (state, action) => {
      state.addresses = state.addresses.filter(
        (addr) => addr.id !== action.payload
      );
    },
    addToWishlist: (state, action) => {
      if (!state.wishlist.some((item) => item.id === action.payload.id)) {
        state.wishlist.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        // 用户信息已经存储在 shell 的 state 中
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        // 用户信息已经存储在 shell 的 state 中
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  addAddress,
  updateAddress,
  removeAddress,
  addToWishlist,
  removeFromWishlist,
} = accountSlice.actions;

export default accountSlice.reducer;
