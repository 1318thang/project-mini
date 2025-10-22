import React from "react";

const CartHeader: React.FC = () => (
    <>
        <div className="flex justify-between items-end">
            <h1 className="text-[30px] font-bold">Shopping Cart</h1>
            <p className="text-[13px] text-gray-600">Price</p>
        </div>
        <hr className="h-1 border-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full" />
    </>
);

export default CartHeader;
