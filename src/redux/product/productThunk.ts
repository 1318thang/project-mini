// productThunk.ts
import type { AppDispatch } from "../store";
import { ProRepository } from "../../api/product/productRepository";
import { GetProductsByCategoryAndAttribute } from "./productSlice";
export const fetchProductsByCategoryAndAttribute = (categoryName: string, attribute: string) => async (dispatch: AppDispatch) => {
    try {
        const data = await ProRepository.getProductsByCategoryAndAttribute(categoryName, attribute); // gọi API
        dispatch(GetProductsByCategoryAndAttribute(data));
    } catch (error) {
        console.error(error);
    }
};