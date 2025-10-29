import type { attributeValueFilterType } from "../../type/attribute/AttributeValueFilterType";
import type { ProductAttributeResultType } from "../../type/product/ProductAttributeResultType";
import type { productType } from "../../type/product/productType";
import { ProService } from "./productService";
export const ProRepository = {
    async getProsLate(param?: { search: string, page?: number }): Promise<productType[]> {
        // const start = performance.now(); // hoặc Date.now()
        const data: productType[] = await ProService.getLatePro(param); // ✅ sửa lại ở đây
        // const end = performance.now();
        // const seconds = ((end - start) / 1000).toFixed(2); // chuyển ms → giây
        // console.log(`⏱ Thời gian lấy dữ liệu ProductLate: ${seconds} giây`);
        return data.map(pro => ({
            ...pro,
            name: pro.name.toLowerCase()
        }));
    },
    async getProsHome(param?: { page?: number; limit?: number }): Promise<productType[]> {
        const data: productType[] = await ProService.getHomePro(param); // get list getHomeProduct
        return data.map(pro => ({
            ...pro,
            name: pro.name.toLowerCase()
        }));
    },
    async searchProByName(name: string, filterJson: Record<string, string[]>): Promise<productType[]> {
        const data: productType[] = await ProService.searchProductsByName(name, filterJson);
        return data.map(pro => ({
            ...pro,
            name: pro.name.toLowerCase()
        }));
    },
    async getProsAll(param?: { search: string, page?: number }): Promise<productType[]> {
        // const start = performance.now(); // hoặc Date.now()
        const data: productType[] = await ProService.getAllPro(param);
        // const end = performance.now();
        // const seconds = ((end - start) / 1000).toFixed(2); // chuyển ms → giây
        // console.log(`⏱ Thời gian lấy dữ liệu ProductAll: ${seconds} giây`);
        return data.map(pro => ({
            ...pro,
            name: pro.name.toLowerCase()
        }));
    },
    async getProId(id: number): Promise<productType> {
        const data: productType = await ProService.getIdPro(id);
        return {
            ...data,
            name: data.name.toLowerCase(),
        };
    },
    async createPro(data: FormData): Promise<productType> {
        try {
            const createdPro = await ProService.createPro(data);
            return {
                ...createdPro,
                name: createdPro.name.toLowerCase(),
            };
        } catch (e: any) {
            console.error("Create product failed:", e.response?.data || e.message);
            throw new Error("Create product failed");
        }
    },
    async updatePro(id: number, data: Partial<productType>): Promise<productType> {
        try {
            const updatedPro = await ProService.updatePro(id, data);
            return {
                ...updatedPro,
                name: updatedPro.name.toLowerCase()
            };
        } catch (e: any) {
            console.error("Update product failed:", e.response?.data || e.message);
            throw new Error("Update product failed");
        }
    },

    //images: string[]
    async deleteProductImages(ids: number[]): Promise<void> {
        try {
            await ProService.deleteProImage(ids);
        } catch (e: any) {
            console.error("Delete product images failed:", e.response?.data || e.message);
            throw new Error("Delete product images failed");
        }
    },
    async addProductImages(id: number, files: File[]): Promise<productType> {
        try {
            const formData = new FormData();
            files.forEach(file => formData.append("files", file)); // "files" trùng param backend
            const updatedProduct = await ProService.AddProImage(id, formData);
            return {
                ...updatedProduct,
                name: updatedProduct.name.toLowerCase()
            };
        } catch (e: any) {
            console.error("Add product images failed:", e.response?.data || e.message);
            throw new Error("Add product images failed");
        }
    },
    async ValueFilterProductsByAttributes(keyword: string): Promise<attributeValueFilterType[]> {
        try {
            const data = await ProService.GetValueFilterProductsByAttributes(keyword);
            // console.log(data);
            return data;
        } catch (e: any) {
            console.error("get value of attribute failed:", e.response?.data || e.message);
            throw new Error("get value of attribute failed");

        }
    },
    async GetProductImageRandom(maxProductNumber: number): Promise<productType[]> {
        try {
            const data = await ProService.GetProductImageRandom(maxProductNumber);
            // console.log("random repository = " + data);
            return data;
        } catch (e: any) {
            console.error("get data failed:", e.response?.data || e.message);
            throw new Error("get data failed");

        }
    },
    async getProductsByCategoryAndAttribute(categoryName: string, attribute: string): Promise<ProductAttributeResultType[]> {
        try {
            const response = await ProService.GetProductsByCategoryAndAttribute(categoryName, attribute);
            console.log("response (chi tiết) =", JSON.stringify(response, null, 2));
            return response;
        } catch (error) {
            console.error("[cateRepository] getProductsByCategoryAndAttribute Error:", error);
            throw error;
        }
    },
}