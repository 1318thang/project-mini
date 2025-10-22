import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import CartItemSkeleton from "../Skeleton"; // skeleton component
import type { cartItemType } from "../../../type/cartItemType";
interface Props {
    onDelete?: (id: number) => void;
    onEdit?: (data: cartItemType) => void;
}
const CartItem: React.FC<Props> = ({ onDelete, onEdit }) => {
    // const cart = useSelector((state: RootState) => state.carts.selectCart);
    const { selectCart: cart, loading } = useSelector(
        (state: RootState) => state.carts
    );

    console.table(cart); // debug: xem dữ liệu thực tế
    // Skeleton cố định 3 item
    if (loading) {
        return (
            <ul className="flex flex-col gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <CartItemSkeleton key={i} type="cart" />
                ))}
            </ul>
        );
    }

    if (!cart || cart.length === 0) {
        return <p>Giỏ hàng trống</p>;
    }

    return (
        <ul className="flex flex-col gap-2">
            {cart.map((item) => (
                <li key={item.id}>
                    <ul className="flex flex-row gap-2 overflow-x-auto">
                        {/* Image */}
                        <li>
                            <div className="w-[120px] h-[140px] overflow-hidden">

                                <img
                                    src={item.productImage}
                                    alt={item.productName}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </li>

                        {/* Desktop */}
                        <li className="hidden lg:block w-[500px]">
                            <div className="w-[340px]">
                                <h3><b>{item.productName}</b></h3>
                                <p className="text-green-900">
                                    <b>{item.quantity ? "In Stock" : "Out of Stock"}</b>
                                </p>
                                <ul className="flex flex-row gap-2">
                                    <li>
                                        <select
                                            name="quantity"
                                            value={item.quantity}
                                            onChange={(e) => {
                                                const newQuantity = Number(e.target.value);
                                                const updatedItem = { ...item, quantity: newQuantity }
                                                onEdit?.(updatedItem);
                                            }}
                                            className="bg-[#d9d9d9] border p-2 rounded-lg max-w-[134.5px] text-[15px]"
                                        >
                                            {Array.from({ length: Math.max(7, Number(item.quantity)) }).map((_, i) => (
                                                <option key={i} value={i + 1}>
                                                    Quantity {i + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </li>
                                    <li className="flex items-center justify-center text-blue-900"><button onClick={() => item.id !== undefined && onDelete?.(item.id)}>Delete</button>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        {/* Mobile */}
                        <li className="block lg:hidden">
                            <h3><b>{item.productName}</b></h3>
                            <p className="text-green-900"><b>{item.quantity ? "In Stock" : "Out of Stock"}</b></p>
                            <ul className="flex flex-row gap-2">
                                <li>
                                    <select
                                        name="quantity"
                                        value={item.quantity}
                                        onChange={(e) => {
                                            const newQuantity = Number(e.target.value);
                                            const updatedItem = { ...item, quantity: newQuantity }
                                            onEdit?.(updatedItem);
                                        }}
                                        className="bg-[#d9d9d9] border p-2 rounded-lg max-w-[134.5px] text-[15px]"
                                    >
                                        {Array.from({ length: 7 }).map((_, i) => (
                                            <option key={i} value={i + 1}>
                                                Quantity {i + 1}
                                            </option>
                                        ))}
                                    </select>
                                </li>
                                <li className="flex items-center justify-center text-blue-900">| Delete</li>
                            </ul>
                        </li>

                        {/* Price */}
                        <li>
                            <h3><b>${item.productPrice}</b></h3>
                        </li>
                    </ul>
                </li>
            ))}
        </ul>
    );
};

export default CartItem;
