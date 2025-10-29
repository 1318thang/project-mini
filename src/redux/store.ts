import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from "./sidebarSlice";
import productReduces from "./product/productSlice";
import cartReduces from "./cartSlice";
import authReduces from "./authSlice";
import uiReduces from "./uiSlice";
import categoriesReduces from "./category/categorySlice";
import languageReducer from "./languageSlice";
import productAttributeValueReducer from "./productAttributeValue/productAttributeValueSlice";
export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        products: productReduces,
        carts: cartReduces,
        auth: authReduces,
        ui: uiReduces,
        categories: categoriesReduces,
        language: languageReducer, // ✅ thêm dòng này
        productAttributeValue: productAttributeValueReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
