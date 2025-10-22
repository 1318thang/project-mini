import React from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
// import type { productType } from "../../type/productType";
import Skeleton from "./Skeleton";



// type ProductGridProps = {
//     products: productType[];
// };

const ProductGrid: React.FC = () => {
    // const products = useSelector((state: RootState) => state.products.homeProducts);
    const { homeProducts: products, loading } = useSelector(
        (state: RootState) => state.products
    );
    // const { lang } = useSelector((state: RootState) => state.language);// language
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
