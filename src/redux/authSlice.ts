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
};

const initialState: AuthState = {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
    user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)
        : null,
};

const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<AuthState>) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.user = action.payload.user;

            localStorage.setItem("accessToken", state.accessToken!);
            localStorage.setItem("refreshToken", state.refreshToken!);
            localStorage.setItem("user", JSON.stringify(state.user));
        },
        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.user = null;
            localStorage.clear();
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
