// src/redux/slices/uiSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface UIState {
    showModal: boolean;
    modalPage: "login" | "register" | null;
}
const initialState: UIState = {
    showModal: false,
    modalPage: null,
};
const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<"login" | "register">) => {
            state.showModal = true;
            state.modalPage = action.payload;
        },
        closeModal: (state) => {
            state.showModal = false;
            state.modalPage = null;
        },
    },
});

export const { openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
