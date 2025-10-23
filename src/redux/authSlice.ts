import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
type User = {
    email: string;
    role: string;
    id: number;
};
type AuthState = {
    accessToken: string | null;
    refreshToken: string | null;
    user: User | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    message: string | null;
};
const initialState: AuthState = {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)
        : null,
    status: "idle",
    message: null,
};
const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<AuthState>) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.user = action.payload.user;
            state.status = "succeeded";
            state.message = "Login successful";
            localStorage.setItem("accessToken", state.accessToken!);
            localStorage.setItem("refreshToken", state.refreshToken!);
            localStorage.setItem("user", JSON.stringify(state.user));
        },
        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.user = null;
            state.status = "idle";
            state.message = null;
            localStorage.clear();
        },
        register: (state, action: PayloadAction<{ success: boolean; message: string }>) => {
            state.status = action.payload.success ? "succeeded" : "failed";
            state.message = action.payload.message;
        }
    },
});
export const { loginSuccess, logout, register } = authSlice.actions;
export default authSlice.reducer;