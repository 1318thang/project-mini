import type { AttributeValues } from "../../type/product/AttributeValues";
import type { ProductAttributeValueOneType } from "../../type/productAttributesValue/ProductAttributeValueOneType";
import { ProductAttributeValueService } from "./productAttrbuteValueService";
export const ProductAttributeValueRepository = {
    async EditToggoleActiveValue(id: number): Promise<AttributeValues> {
        try {
            const updatedPro = await ProductAttributeValueService.EditToggoleActiveValue(id);
            return updatedPro;
        } catch (e: any) {
            console.error("Update product failed:", e.response?.data || e.message);
            throw new Error("Update product failed");
        }
    },
    async AddValueOfProductByAttribute(data: ProductAttributeValueOneType) {
        try {
            const result = await ProductAttributeValueService.AddValueOfProductByAttribute(data);
            return result;
        } catch (e: any) {
            console.error("Add value of product failed:", e.response?.data || e.message);
            throw new Error("Add value of product failed:");
        }
    }
}