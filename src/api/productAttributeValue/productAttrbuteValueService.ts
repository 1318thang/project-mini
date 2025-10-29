import type { AttributeValues } from "../../type/product/AttributeValues";
import type { ProductAttributeValueOneType } from "../../type/productAttributesValue/ProductAttributeValueOneType";
import { apiService } from "../apiService";

export const ProductAttributeValueService = {
    EditToggoleActiveValue: (id: number): Promise<AttributeValues> =>
        apiService.put(`/Admin/toggle-active/${id}`),
    AddValueOfProductByAttribute: (data: ProductAttributeValueOneType): Promise<ProductAttributeValueOneType> =>
        apiService.post(`/Admin/add-attribute-value`, data),
}