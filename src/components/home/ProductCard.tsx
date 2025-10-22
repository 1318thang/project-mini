import React from "react";

type ProductCardProps = {
    image: string;
    title: string;
    price: string;
    link: string;
};

const ProductCard: React.FC<ProductCardProps> = ({ image, title, price, link }) => {
    return (
        <div className="w-[180px] md:w-[200px] h-auto bg-white flex flex-col gap-8 rounded-lg">
            <div className="w-[180px] md:w-[200px] h-auto">
                <img
                    src={image}
                    alt={title}
                    className="w-[180px] md:w-[200px] h-[164px] rounded-t-lg"
                />
            </div>
            <div className="w-[166px] px-2">
                <a href={link}>
                    <h5 className="text-base font-medium line-clamp-2 h-12">
                        {title}
                    </h5>
                </a>
            </div>
            <div className="w-[166px] px-2 py-1">
                <h6 className="flex items-start">
                    <span className="text-sm">$</span>
                    <span className="text-2xl font-bold leading-none">
                        {parseInt(price.split(".")[0], 10)}
                    </span>
                    <span className="text-sm align-top">
                        {price.includes(".") ? price.split(".")[1] : "00"}
                    </span>
                </h6>
            </div>
        </div>
    );
};

export default ProductCard;
