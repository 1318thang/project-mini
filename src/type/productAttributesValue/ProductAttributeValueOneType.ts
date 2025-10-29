export interface ProductAttributeValueOneType {
    productAttributeValueId?: number; // 👈 cho phép optional
    attributeId: number;
    productId: number;
    value: string;
    // ValuesForInsert: string[];
}