import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import addressReducer from "./slices/addressSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    address: addressReducer,
  },
});