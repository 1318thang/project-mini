import React from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

import Skeleton from "./Skeleton";
const ProductGrid: React.FC = () => {
    const { homeProducts: products, loading } = useSelector(
        (state: RootState) => state.products
    );
    if (loading) {
        return (
            <ul className="flex flex-col gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} type="product" />
                ))}
            </ul>
        );
    }
    return (
        <div className="bg-[#d9d9d9] grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 md:gap-[1px] lg:gap-[41.5px] gap-3 md:px-6">
            {products.map((p, index) => (
                <ProductCard
                    key={index}
                    image={p.mainImage}
                    title={p.name}
                    price={p.price.toString()}
                    link={`#/productdetail/${p.id}`}   // RESTful style
                />
            ))}
        </div>
    );
};
export default ProductGrid;