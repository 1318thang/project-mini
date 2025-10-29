// categoryThunk.ts
import type { AppDispatch } from "../store";
import { CategoryRepository } from "../../api/categoryAttributes/categoryRepository";
import { getCategoryAttributeJson } from "./categorySlice";

export const fetchCategoryAttributeJson = () => async (dispatch: AppDispatch) => {
    try {
        const data = await CategoryRepository.getCategoryAttributeJson(); // gọi API
        dispatch(getCategoryAttributeJson(data)); // đẩy dữ liệu vào store
    } catch (error) {
        console.error(error);
    }
};

