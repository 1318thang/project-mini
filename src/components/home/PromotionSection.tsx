import React from "react";
type PromotionSectionProps = {
    images: string[];
};
const PromotionSection: React.FC<PromotionSectionProps> = ({ images }) => {
    return (
        <div id="promotion" className="hidden md:flex flex-col gap-1">
            {images.map((img, index) => (
                <img
                    key={index}
                    src={img}
                    alt={`promotion-${index}`}
                    className="md:h-[186px] md:w-[670px]"
                />
            ))}
        </div>
    );
};
export default PromotionSection;
