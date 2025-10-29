import type { ProductAttributeValuesType } from "../productAttributesValue/ProductAttributesValuesType";
export interface productType {
    id: number;
    name: string;
    description: string;
    price: number;
    mainImage: string;
    secondaryImage: string[];
    ids: number[]; // for deletion
    categoryName: string; // --> table CategoryAttributes
    AttributeId: number; // --> table Attributes
    productAttributeValues: ProductAttributeValuesType[]
    stock: number;
    attributes: ProductAttributeValuesType[];
    subImages: string[];
    created_at: Date;
    update_at: Date;
}