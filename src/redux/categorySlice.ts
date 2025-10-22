import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { categoryAttributesType } from "../type/categoryAttribute/categoryAttribute";
import type { attributesType } from "../type/attribute/AttributeType";

interface CategoryState {
    categories: categoryAttributesType[];
    categoryAttribute: attributesType[];
}
const initialState: CategoryState = {
    categories: [],
    categoryAttribute: [],

};

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        getAllCategories: (state, action: PayloadAction<categoryAttributesType[]>) => {
            state.categories = action.payload;
        },
        getCategoryAttribute: (state, action: PayloadAction<attributesType[]>) => {
            state.categoryAttribute = action.payload
        }

    }
})

export const { getAllCategories, getCategoryAttribute } =
    categorySlice.actions;
export default categorySlice.reducer;
