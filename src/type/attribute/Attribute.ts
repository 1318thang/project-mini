import type { AttributeValue } from "./AttributeValue";

export interface Attribute {
    id: number;
    name: string;
    description?: string;
    type: 'select' | 'multiselect' | 'checkbox';
    values: AttributeValue[];
}