import React
    // , { useState } 
    from "react";
import DealItem from "./DealItem";

import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { CartRepository } from "../../../api/cart/cartRepository";
import type { cartItemType } from "../../../type/cartItemType";
interface Props {
    trendKey: string;
    title: string;
}
const CartDeals: React.FC<Props> = ({ trendKey, title }) => {
    // const productdeal = useSelector((state: RootState) => state.products.getProductImageRandom);
    console.log(title);
    const productdeal = useSelector(
        (state: RootState) => state.products.trends[trendKey] || []
    );

    const handleAddToCart = async (idpro: number) => {
        if (!idpro) return;
        // setLoading(true);
        try {
            const user = JSON.parse(localStorage.getItem("user")!);
            const userid = user.id;// emulator userId
            console.log("userId = " + userid);
            const cartItem: Omit<cartItemType, "id"> = {
                userId: userid, // giả sử user đang đăng nhập là id=1
                productId: idpro,
                quantity: 1,
                CreatedAt: new Date()
            };

            const result = await CartRepository.AddToCart(cartItem);
            console.log("Added to cart:", result);
            alert("Sản phẩm đã được thêm vào giỏ hàng!");

        } catch (error) {
            console.error("Add to cart failed", error);
            alert("Có lỗi xảy ra khi thêm vào giỏ hàng.");
        } finally {
            // setLoading(false);
        }
    }
    return (
        <div className='hidden md:block bg-white rounded-[2px] p-4'>
            <h3><b>Deals in magazine subscription</b></h3>
            {/* Bao bên ngoài để scroll tổng ngang */}
            <div className='overflow-x-auto lg:overflow-x-hidden w-full'>
                <ul className='flex flex-col gap-4 min-w-max'>
                    {productdeal.map((deal) => (
                        <li key={deal.id} className='flex-shrink-0'>
                            <DealItem
                                image={deal.mainImage}
                                title={deal.name}
                                type={deal.categoryName}
                                price={deal.price}
                                id={deal.id}
                                onAddToCart={() => handleAddToCart(deal.id)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CartDeals;
