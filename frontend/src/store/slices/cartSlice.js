import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const exist = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (exist) {
        exist.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    updateQty: (state, action) => {
      const { id, delta } = action.payload;
      const item = state.items.find((i) => i.id === id);

      if (item) {
        item.quantity = Math.max(1, item.quantity + delta);
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQty } =
  cartSlice.actions;

export default cartSlice.reducer;