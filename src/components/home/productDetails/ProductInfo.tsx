// ProductInfo.tsx
import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import DOMPurify from "dompurify";
interface props {
    // product: productType[];
}
const ProductInfo: React.FC<props> = () => {
    const products = useSelector((state: RootState) => state.products.selectProduct);

    return (
        <div className="flex flex-col w-full max-w-[505px] gap-3">
            <h3 className="text-[9px] md:text-lg">
                <b>
                    {products?.name
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}
                </b>
            </h3>
            <div className="flex flex-row">
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStarHalfAlt className="text-yellow-400" />
            </div>
            <hr className="h-1 border-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full" />
            <h1>
                <h6 className="flex items-start">
                    <span className="text-sm">$</span>

                    {/* phần nguyên */}
                    <span className="text-2xl font-bold leading-none">
                        {products?.price
                            ? products.price.toString().split(".")[0]
                            : "0"}
                    </span>

                    {/* phần thập phân */}
                    <span className="text-sm align-top">
                        {products?.price && products.price.toString().includes(".")
                            ? products.price.toString().split(".")[1]
                            : "00"}
                    </span>
                </h6>

            </h1>
            <h3>
                <b>Color</b>
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-2 w-full">
                {Array.from({ length: 6 }).map((_, i) => {
                    const filters = [
                        "none",
                        "grayscale(100%) brightness(1.2) contrast(1)", // xám đậm
                        "hue-rotate(200deg) saturate(2) brightness(1.1)", // xanh
                        "hue-rotate(320deg) saturate(2) brightness(1.1)", // hồng
                        "hue-rotate(120deg) saturate(2) brightness(1.1)", // xanh lá
                        "sepia(100%) saturate(2) brightness(1.1)",        // nâu vàng
                        "hue-rotate(40deg) saturate(3) brightness(1.1)",  // cam
                    ];
                    return (
                        <div key={i} className="w-full max-w-[287px] h-auto">
                            <img
                                src={products?.mainImage}
                                alt=""
                                className="w-full h-auto object-cover"
                                style={{ filter: filters[i % filters.length] }}
                            />
                        </div>
                    );
                })}
            </div>
            <hr className="h-1 border-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full" />


            <div
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(products?.description || "") }}
            />
        </div>
    );
};

export default ProductInfo;
