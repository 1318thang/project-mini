// ProductImages.tsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { ChevronLeft, ChevronRight } from "lucide-react"; // icon đẹp từ lucide-react
const ProductImages: React.FC = () => {
    const products = useSelector((state: RootState) => state.products.selectProduct);
    // cho biết ảnh lớn hiện tại
    // lưu màu đang chọn (mặc định none)
    const [selectedImg, setSelectedImg] = useState<string | null>(null);
    const images = [products?.mainImage, ...(products?.secondaryImage ?? [])];
    // hiển thị tối đa 4 ảnh thumbnail một lần
    const [startIndex, setStartIndex] = useState(0);
    const visibleCount = 4;
    const visibleImages = images.slice(startIndex, startIndex + visibleCount);
    const nextThumbGroup = () => {
        if (startIndex + visibleCount < images.length) {
            setStartIndex(startIndex + 1);
        }
    };
    const prevThumbGroup = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };
    if (!products) return <div>Không có sản phẩm được chọn</div>;
    return (
        <div className="flex flex-col max-w-[539px] md:justify-center items-center gap-3">
            {/* Ảnh lớn + nút điều hướng */}
            <div className="relative w-full max-w-[287px] bg-white flex items-center justify-center">


                <img
                    src={selectedImg || products.mainImage}
                    alt="main"
                    className="w-full h-auto object-contain rounded-md"
                />


            </div>

            {/* Thumbnails + nút điều hướng */}
            <div className="flex items-center gap-2 mt-2">
                <button
                    onClick={prevThumbGroup}
                    disabled={startIndex === 0}
                    className={`p-1 rounded-full ${startIndex === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"
                        }`}
                >
                    <ChevronLeft size={18} />
                </button>

                <div className="grid grid-cols-4 gap-2 bg-white">
                    {visibleImages.map((imgUrl, i) => (
                        <div
                            key={i}
                            className={`cursor-pointer border-2 rounded-md ${selectedImg === imgUrl ? "border-blue-500" : "border-transparent"
                                }`}
                            onClick={() => imgUrl && setSelectedImg(imgUrl)}
                        >
                            <img
                                src={imgUrl}
                                alt={`color-${i}`}
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    ))}
                </div>
                <button
                    onClick={nextThumbGroup}
                    disabled={startIndex + visibleCount >= images.length}
                    className={`p-1 rounded-full ${startIndex + visibleCount >= images.length
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:bg-gray-100"
                        }`}>
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
};
export default ProductImages;