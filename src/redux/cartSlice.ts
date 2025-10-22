import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { cartItemType } from "../type/cartItemType";

interface CartState {
    items: cartItemType[];
    selectCart: cartItemType[] | null;
    loading: boolean;       // ⬅️ thêm
    totalCount: number;     // ⬅️ thêm
}
const initialState: CartState = {
    items: [],
    selectCart: [],
    loading: true,   // ⬅️ mặc định chưa loading
    totalCount: 0,    // ⬅️ mặc định 0
};
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Omit<cartItemType, "quantity">>) => {
            const existing = state.items.find((i) => i.id === action.payload.id);
            if (existing) {
                existing.quantity! += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        updateCart: (state, action: PayloadAction<cartItemType>) => {
            const index = state.items.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        getCartByUser: (state, action: PayloadAction<cartItemType[]>) => {
            state.selectCart = action.payload;

        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setLength: (state, action: PayloadAction<number>) => {
            state.totalCount = action.payload;
        },
        removeCartById: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(
                (p) => p.id !== action.payload
            );
        }
    },
});

export const { addToCart, getCartByUser, setLoading, setLength, removeCartById, updateCart } = cartSlice.actions;

export default cartSlice.reducer;
