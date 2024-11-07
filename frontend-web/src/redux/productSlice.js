// src/redux/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Fetch products from backend API
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await api.get('/products');
  return response.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],       // List of products
    loading: false,  // Loading state
    error: null,     // Error state
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
