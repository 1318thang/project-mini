import type { cartItemType } from "../../type/cartItemType";
import { apiService } from "../apiService";


const cartUrl = "/home/cart";
export const cartService = {
    // Get cart by userId or Cartid
    getCartByUserId: (id: number): Promise<cartItemType[]> =>
        apiService.get<cartItemType[]>(`${cartUrl}/${id}`),
    // Add products to cart
    createCart: (data: Omit<cartItemType, "id">): Promise<cartItemType> =>
        apiService.post(cartUrl, data),
    // Remove product from cart
    removeCart: (id: number): Promise<boolean> =>
        apiService.delete(`${cartUrl}/${id}`),
    updateCart: (data: Omit<cartItemType, "id">): Promise<cartItemType> =>
        apiService.put(cartUrl, data)
}
