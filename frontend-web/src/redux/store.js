import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./userSlice";
import cartReducer from './cartSlice';
import productReducer from './productSlice';


const store = configureStore({
    reducer: {
        user: useReducer,
        cart: cartReducer,
        products: productReducer
    },
});

export default store;