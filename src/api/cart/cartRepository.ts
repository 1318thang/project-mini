import type { cartItemType } from "../../type/cartItemType";
import { cartService } from "./cartService";
export const CartRepository = {
    async AddToCart(data: Omit<cartItemType, "id">): Promise<cartItemType> {
        try {
            const createdItem = await cartService.createCart(data);
            return createdItem; // backend chỉ trả 1 object
        } catch (e: any) {
            console.error("Add to cart failed:", e.response?.data || e.message);
            throw new Error("Create cart failed");
        }
    },
    async GetCartByUser(userId: number): Promise<cartItemType[]> {
        try {
            const cartItems: cartItemType[] = await cartService.getCartByUserId(userId);
            return cartItems; // không cần map thêm name = UserId
        } catch (e: any) {
            console.error("Get all information of user failed:", e.response?.data || e.message);
            throw new Error("Get not data!!");

        }
    },
    async RemoveCartByIdOfUser(cartId: number): Promise<boolean> {
        try {
            const isDeleted: boolean = await cartService.removeCart(cartId);
            if (!isDeleted) return false;
            return true;
        } catch (e: any) {
            console.error("Delete Cart By Id Of User failed:", e.response?.data || e.message);
            throw new Error("Not Remove!!");
            return false;
        }
    },
    async UpdatedCart(data: Omit<cartItemType, "id">): Promise<cartItemType> {
        try {
            const updatedItem = await cartService.updateCart(data);
            return updatedItem; // backend chỉ trả 1 object
        } catch (e: any) {
            console.error("Update to cart failed:", e.response?.data || e.message);
            throw new Error("Update cart failed");
        }
    },

}