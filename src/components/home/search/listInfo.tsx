import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../redux/store';
import { ArrowLeft, ArrowRight } from 'lucide-react';
const ListInfo: React.FC = () => {
    const products = useSelector((state: RootState) => state.products.resultSearch);
    const [selectedImages, setSelectedImages] = useState<Record<number, string>>({});
    const [startIndexes, setStartIndexes] = useState<Record<number, number>>({});
    const visibleCount = 5;
    const handleNext = (id: number, total: number) => {
        setStartIndexes((prev) => {
            const current = prev[id] || 0;
            if (current + visibleCount < total) {
                return { ...prev, [id]: current + 1 };
            }
            return prev;
        });
    };
    const handlePrev = (id: number) => {
        setStartIndexes((prev) => {
            const current = prev[id] || 0;
            if (current > 0) {
                return { ...prev, [id]: current - 1 };
            }
            return prev;
        });
    };
    const handleSelectImage = (id: number, src: string) => {
        setSelectedImages((prev) => ({ ...prev, [id]: src }));
    };
    return (
        <>
            {/* ép chiếm toàn hàng của grid cha */}
            <div className="col-span-4 w-full">
                <div className="flex flex-col w-full gap-3">
                    {products.map((p) => {
                        const currentStart = startIndexes[p.id] || 0;
                        const mainImg = selectedImages[p.id] || p.mainImage;
                        const secondaryImages = p.secondaryImage || [];
                        // const totalImages = secondaryImages.length;
                        return (
                            <div key={p.id} className="flex flex-col md:flex-row w-full rounded-lg bg-white p-4 hover:shadow-md transition gap-4">
                                {/* LEFT: Hình ảnh */}
                                <div className="w-full md:w-[250px] flex-shrink-0 flex flex-col items-center">
                                    <img
                                        src={mainImg}
                                        className="w-full h-[250px] object-cover rounded-lg"
                                    />
                                    <div className="hidden md:flex items-center justify-center gap-2 mt-2">
                                        <button
                                            onClick={() => handlePrev(p.id)}
                                            className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                                        >
                                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                                        </button>
                                        <div className="flex gap-1 mx-2 overflow-hidden">
                                            {secondaryImages
                                                .slice(currentStart, currentStart + visibleCount)
                                                .map((img, idx) => (
                                                    <img
                                                        key={currentStart + idx}
                                                        src={img}
                                                        onClick={() => handleSelectImage(p.id, img)}
                                                        className="w-7 h-7 object-cover cursor-pointer hover:scale-105 transition rounded"
                                                    />
                                                ))}
                                        </div>
                                        <button
                                            onClick={() => handleNext(p.id, secondaryImages.length)}
                                            className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                                        >
                                            <ArrowRight className="w-5 h-5 text-gray-600" />
                                        </button>
                                    </div>
                                </div>
                                {/* RIGHT: Thông tin sản phẩm */}
                                <div className="flex flex-col md:flex-row justify-between flex-grow px-0 md:px-4 gap-4 md:gap-10">
                                    <div className='flex-1 min-w-0'>
                                        <a href={`/productdetail/${p.id}`}>
                                            <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 hover:text-blue-600 cursor-pointer">
                                                {p.name}
                                            </h2>
                                        </a>

                                        <p className="text-xs text-gray-400 mt-1">City Ho Chi Minh</p>
                                    </div>

                                    <div className="text-right text-orange-500 font-semibold text-xl mt-3 md:mt-0">
                                        ${p.price.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        </>
    );
};
export default ListInfo;    