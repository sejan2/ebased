import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductsSlice from "./admin/product-slice"
import ShoppingProductsSlice from "./shop/products-slice"
import shoppingCartSlice from "./shop/cart-slice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: AdminProductsSlice,
        shopProducts: ShoppingProductsSlice,
        shopCart: shoppingCartSlice
    },
});

export default store;