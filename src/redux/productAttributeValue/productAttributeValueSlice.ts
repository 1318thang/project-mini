import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AttributeValues } from "../../type/product/AttributeValues";
import type { ProductAttributeValueOneType } from "../../type/productAttributesValue/ProductAttributeValueOneType";
interface productAttributeValueState {
    attributeValues: AttributeValues[];
    productAttributeValueOne: ProductAttributeValueOneType[]
}
const initialState: productAttributeValueState = {
    attributeValues: [],
    productAttributeValueOne: []
};
const productAttributeValueSlice = createSlice({
    name: 'productAttributeValue',
    initialState,
    reducers: {
        setAttributeValues: (state, action: PayloadAction<AttributeValues[]>) => {
            state.attributeValues = action.payload;
        },
        // ✅ cập nhật trạng thái active cho 1 value tại chỗ
        toggleActiveSuccess: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            const index = state.attributeValues.findIndex(
                (a) => a.productAttributeValueId === id
            );
            if (index !== -1) {
                state.attributeValues[index].isActive = !state.attributeValues[index].isActive;
            }
        },
        // ✅ Thêm attribute value mới vào danh sách
        addAttributeValueSuccess: (state, action: PayloadAction<ProductAttributeValueOneType>) => {
            state.productAttributeValueOne.push(action.payload);
        },

    },
});
export const { setAttributeValues, toggleActiveSuccess, addAttributeValueSuccess } =
    productAttributeValueSlice.actions;
export default productAttributeValueSlice.reducer;