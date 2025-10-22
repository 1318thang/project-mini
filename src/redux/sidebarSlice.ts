// sidebarSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface SidebarState {
    isExpanded: boolean;
    isMobileOpen: boolean;
    activeItem: string | null;
    openSubmenu: string | null;
}
const initialState: SidebarState = {
    isExpanded: true,
    isMobileOpen: false,
    activeItem: null,
    openSubmenu: null,
};
const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isExpanded = !state.isExpanded;
        },
        toggleMobileSidebar: (state) => {
            state.isMobileOpen = !state.isMobileOpen;
        },
        setActiveItem: (state, action: PayloadAction<string | null>) => {
            state.activeItem = action.payload;
        },
        toggleSubmenu: (state, action: PayloadAction<string>) => {
            state.openSubmenu =
                state.openSubmenu === action.payload ? null : action.payload;
        },
    },
});

export const {
    toggleSidebar,
    toggleMobileSidebar,
    setActiveItem,
    toggleSubmenu,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
