// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],        // Array of items in the cart
    totalQuantity: 0, // Total number of items in the cart
    totalAmount: 0,   // Total price of items in the cart
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += item.price;
      } else {
        state.items.push({
          ...item,
          quantity: 1,
          totalPrice: item.price,
        });
      }
      state.totalQuantity += 1;
      state.totalAmount += item.price;
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(i => i.id === id);

      if (existingItem) {
        state.totalQuantity -= 1;
        state.totalAmount -= existingItem.price;

        if (existingItem.quantity === 1) {
          // Remove the item if quantity is 1
          state.items = state.items.filter(i => i.id !== id);
        } else {
          existingItem.quantity -= 1;
          existingItem.totalPrice -= existingItem.price;
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
