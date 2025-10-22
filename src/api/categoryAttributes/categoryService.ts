import { apiService } from "../apiService";
import type { categoryAttributesType } from "../../type/categoryAttribute/categoryAttribute";
import type { attributesType } from "../../type/attribute/AttributeType";
export const cateService = {
    getAllCategory: (params?: any): Promise<categoryAttributesType[]> =>
        apiService.get<categoryAttributesType[]>("/Admin/categories", { params }),
    getCategoryAttributes: (categoryName: string | undefined, params?: any): Promise<attributesType[]> =>
        apiService.get<attributesType[]>(`/Admin/categories/${categoryName}/attributes`, { params }),

}