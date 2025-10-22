import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from "./sidebarSlice";
import productReduces from "./productSlice";
import cartReduces from "./cartSlice";
import authReduces from "./authSlice";
import uiReduces from "./uiSlice";
import categoriesReduces from "./categorySlice";
import languageReducer from "./languageSlice";
export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        products: productReduces,
        carts: cartReduces,
        auth: authReduces,
        ui: uiReduces,
        categories: categoriesReduces,
        language: languageReducer, // ✅ thêm dòng này
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
