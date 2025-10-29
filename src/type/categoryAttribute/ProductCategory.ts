import type { Attribute } from "../attribute/Attribute";
export interface ProductCategory {
    id: string;
    name: string;
    description: string;
    icon?: string;
    attributes: Attribute[];
}