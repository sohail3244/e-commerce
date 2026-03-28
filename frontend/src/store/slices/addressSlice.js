import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addresses: [],
  selectedAddressId: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    addAddress: (state, action) => {
      const newAddress = {
        id: Date.now(),
        ...action.payload,
      };
      state.addresses.push(newAddress);

      // first address auto select
      if (state.addresses.length === 1) {
        state.selectedAddressId = newAddress.id;
      }
    },

    removeAddress: (state, action) => {
      state.addresses = state.addresses.filter(
        (addr) => addr.id !== action.payload
      );
    },

    selectAddress: (state, action) => {
      state.selectedAddressId = action.payload;
    },
  },
});

export const { addAddress, removeAddress, selectAddress } =
  addressSlice.actions;

export default addressSlice.reducer;