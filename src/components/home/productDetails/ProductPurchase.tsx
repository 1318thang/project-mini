import React, { useState } from "react";
import type { RootState } from "../../../redux/store";
import {
    // useDispatch,
    useSelector
} from "react-redux";
import type { cartItemType } from "../../../type/cartItemType";
import { CartRepository } from "../../../api/cart/cartRepository";

const ProductPurchase: React.FC = () => {

    const products = useSelector((state: RootState) => state.products.selectProduct);
    console.log("id product = " + products?.id);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    // total luôn tính từ props + state, không cần useEffect

    const total = Number(products?.price || 0) * quantity;
    const handleAddToCart = async () => {

        if (!products?.id) return;
        setLoading(true);
        try {
            const user = JSON.parse(localStorage.getItem("user")!);
            const userid = user.id;// emulator userId
            console.log("userId = " + userid);
            const cartItem: Omit<cartItemType, "id"> = {
                userId: userid, // giả sử user đang đăng nhập là id=1
                productId: products.id,
                quantity: quantity,
                CreatedAt: new Date()
            };

            const result = await CartRepository.AddToCart(cartItem);
            console.log("Added to cart:", result);
            alert("Sản phẩm đã được thêm vào giỏ hàng!");

        } catch (error) {
            console.error("Add to cart failed", error);
            alert("Có lỗi xảy ra khi thêm vào giỏ hàng.");
        } finally {
            setLoading(false);
        }


    }

    return (
        <div className="flex flex-col max-w-[234px] px-2 gap-2">
            <h1 className="text-[15px] md:text-[20px] lg:text-[30px]">
                <b>${total}</b>
            </h1>
            <h2 className="text-[10px] md:text-[15px] lg:text-[25px] text-green-800">
                <b>In Stock</b>
            </h2>
            <select
                name="quantity1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="bg-[#d9d9d9] p-2 rounded-lg w-full max-w-[187.5px] appearance-none text-[7px] md:text-[15px] lg:text-[20px]"
            >
                {Array.from({ length: 7 }).map((_, i) => (
                    <option key={i} value={i + 1}>
                        Quantity {i + 1}
                    </option>
                ))}
            </select>
            <button className="bg-blue-600 text-white rounded-lg p-2 w-full max-w-[187.5px] text-[7px] md:text-[15px] lg:text-[20px]">
                <b>Buy</b>
            </button>
            <button
                onClick={handleAddToCart}
                disabled={loading}
                className="bg-green-600 text-white rounded-lg p-2 w-full max-w-[187.5px] text-[7px] md:text-[15px] lg:text-[20px]">
                <a href="#/cart">
                    <b>Cart</b>
                </a>
            </button>
        </div>
    );
};

export default ProductPurchase;
