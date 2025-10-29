import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { categoryAttributesType } from "../../type/categoryAttribute/categoryAttribute";
import type { attributesType } from "../../type/attribute/AttributeType";
interface CategoryState {
    categories: categoryAttributesType[];
    categoryAttribute: attributesType[];
    categoryAttributeJson: string | null;
}
const initialState: CategoryState = {
    categories: [],
    categoryAttribute: [],
    categoryAttributeJson: null,
};
const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        getAllCategories: (state, action: PayloadAction<categoryAttributesType[]>) => {
            state.categories = action.payload;
        },
        getCategoryAttribute: (state, action: PayloadAction<attributesType[]>) => {
            state.categoryAttribute = action.payload;
        },
        getCategoryAttributeJson: (state, action: PayloadAction<string>) => {
            state.categoryAttributeJson = action.payload;
        }
    }
})
export const { getAllCategories, getCategoryAttribute, getCategoryAttributeJson } =
    categorySlice.actions;
export default categorySlice.reducer;
