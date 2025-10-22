import type { attributeValueFilterType } from "../../type/attribute/AttributeValueFilterType";
import type { productType } from "../../type/productType";
import { apiService } from "../apiService";
const AdminProUrl = "/home/products";
const homeUrl = "/home/productshome";
const ProcessImg = "/home/images";
export const ProService = {
    getAllPro: (params?: any): Promise<productType[]> =>
        apiService.get<productType[]>("/Admin/products", { params }),
    getLatePro: (params?: any): Promise<productType[]> =>
        apiService.get<productType[]>("/Admin/productslate", { params }),
    getHomePro: (params?: any): Promise<productType[]> =>
        apiService.get<productType[]>(homeUrl, { params }),
    searchProductsByName: (name: string, filter: Record<string, string[]>): Promise<productType[]> => {
        const filterJson = encodeURIComponent(JSON.stringify(filter));
        return apiService.get<productType[]>(`/home/search?name=${name}&filterJson=${filterJson}`);
    },
    getIdPro: (id: number): Promise<productType> =>
        apiService.get<productType>(`${AdminProUrl}/${id}`),
    // createPro: (data: Omit<productType, "id">): Promise<productType> =>
    //     apiService.post(AdminProUrl, data),
    createPro: (data: FormData): Promise<productType> =>
        apiService.post<productType>("/home/products", data),

    updatePro: (id: number, data: Partial<productType>): Promise<productType> =>
        apiService.put(`${AdminProUrl}/${id}`, data),
    deleteProImage: (ids: number[]): Promise<void> =>
        apiService.delete<void>(ProcessImg, { data: ids }), // note: { data: ids }

    AddProImage: (id: number, images: FormData): Promise<productType> => {
        return apiService.post(`${ProcessImg}/${id}`, images);
    },
    GetValueFilterProductsByAttributes: (keyword: string): Promise<attributeValueFilterType[]> =>
        apiService.get<attributeValueFilterType[]>("/home/filterAttributes", {
            params: { keyword },
        }),
    GetProductImageRandom: (maxProduct: number): Promise<productType[]> =>
        apiService.get<productType[]>("/home/productsRandomImage", {
            params: { maxProduct }
        }),

}