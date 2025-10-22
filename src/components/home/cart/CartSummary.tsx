import React from "react";
import { FaCheck } from "react-icons/fa";

interface CartSummaryProps {
    subtotal: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal }) => (
    <div className="bg-white rounded-[2px] p-4">
        <div className="flex flex-row gap-2">
            <button className="rounded-full bg-green-600 p-0.5">
                <FaCheck className="text-white text-[19px]" />
            </button>
            <p className="text-green-600">Your order qualifies for FREE Shipping</p>
        </div>
        <div className="flex flex-col gap-2 p-2">
            <h3>Subtotal (items): ${subtotal.toFixed(2)}</h3>
            <button className="bg-amber-300 rounded-[8px] p-2 shadow-md">
                <p>Process to checkout</p>
            </button>
        </div>
    </div>
);

export default CartSummary;
