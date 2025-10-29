import type { AttributeValues } from "./AttributeValues";

export type ProductAttributeResultType = {
    productId: number;
    productName: string;
    attributeValues: AttributeValues[];
};
