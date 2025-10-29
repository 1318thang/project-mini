import type { categoryAttributesType } from "../../type/categoryAttribute/categoryAttribute";
import { cateService } from "./categoryService";
import type { attributesType } from "../../type/attribute/AttributeType";
export const CategoryRepository = {
    async getAllCategory(param?: { search: string, page?: number }): Promise<categoryAttributesType[]> {
        console.log(param)
        const data: categoryAttributesType[] = await cateService.getAllCategory(); // ✅ sửa lại ở đây
        return data.map(cate => ({
            ...cate,
        }));
    },
    async getCategoryAttribute(categoryName: string): Promise<attributesType[]> {
        if (!categoryName) return []; // nếu chưa có categoryName thì trả rỗng luôn
        const data: attributesType[] = await cateService.getCategoryAttributes(categoryName);
        return data.map(cate => ({
            ...cate,

        }));
    },
    async getCategoryAttributeJson(): Promise<string> {
        try {
            const jsonString = await cateService.getCategoryAttributesJson();
            console.log("json = " + jsonString)
            return jsonString;
        } catch (e: any) {
            console.error(e);
            return "[]";
        }
    },

}