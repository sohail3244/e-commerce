import { createSlice } from "@reduxjs/toolkit";

// ==============================
// ✅ Load from localStorage
// ==============================
const loadAddressFromStorage = () => {
  try {
    const data = localStorage.getItem("address");
    return data
      ? JSON.parse(data)
      : { addresses: [], selectedAddressId: null };
  } catch (error) {
    return { addresses: [], selectedAddressId: null };
  }
};

// ==============================
// ✅ Save to localStorage
// ==============================
const saveAddressToStorage = (state) => {
  try {
    localStorage.setItem("address", JSON.stringify(state));
  } catch (error) {
    console.log("Storage error");
  }
};

// ==============================
// ✅ Initial State (SSR SAFE)
// ==============================
const initialState = {
  addresses: [],
  selectedAddressId: null,
};

// ==============================
// ✅ Slice
// ==============================
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    // 🔥 Load from localStorage (client side)
    setAddress: (state, action) => {
      state.addresses = action.payload.addresses || [];
      state.selectedAddressId = action.payload.selectedAddressId || null;
    },

    // ➕ Add Address
    addAddress: (state, action) => {
      const newAddress = {
        id: Date.now(),
        ...action.payload,
      };

      state.addresses.push(newAddress);

      // auto select first
      if (state.addresses.length === 1) {
        state.selectedAddressId = newAddress.id;
      }

      saveAddressToStorage(state);
    },

    // ❌ Remove Address
    removeAddress: (state, action) => {
      state.addresses = state.addresses.filter(
        (addr) => addr.id !== action.payload
      );

      // agar deleted address selected tha
      if (state.selectedAddressId === action.payload) {
        state.selectedAddressId =
          state.addresses.length > 0 ? state.addresses[0].id : null;
      }

      saveAddressToStorage(state);
    },

    // ✅ Select Address
    selectAddress: (state, action) => {
      state.selectedAddressId = action.payload;

      saveAddressToStorage(state);
    },
  },
});

// ==============================
// ✅ Export Actions
// ==============================
export const {
  setAddress,
  addAddress,
  removeAddress,
  selectAddress,
} = addressSlice.actions;

// ==============================
// ✅ Export Reducer
// ==============================
export default addressSlice.reducer;