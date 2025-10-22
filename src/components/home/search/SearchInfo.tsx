import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
// import img1 from "../../../../public/carousel1.jpg";
// import img2 from "../../../../public/carousel2.png";
// import img3 from "../../../../public/carousel3.jpg";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../redux/store';
import type { cartItemType } from '../../../type/cartItemType';
import { CartRepository } from '../../../api/cart/cartRepository';

interface Props { }

const SearchInfo: React.FC<Props> = () => {
    const products = useSelector((state: RootState) => state.products.resultSearch);
    // mỗi sản phẩm có state riêng
    const [selectedImages, setSelectedImages] = useState<Record<number, string>>({});
    const [startIndexes, setStartIndexes] = useState<Record<number, number>>({});
    const visibleCount = 4;
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


    const handleAddToCart = async (idpro: number) => {

        if (!idpro) return;
        // setLoading(true);
        try {
            const user = JSON.parse(localStorage.getItem("user")!);
            const userid = user.id;// emulator userId
            console.log("userId = " + userid);
            const cartItem: Omit<cartItemType, "id"> = {
                userId: userid, // giả sử user đang đăng nhập là id=1
                productId: idpro,
                quantity: 1,
                CreatedAt: new Date()
            };

            const result = await CartRepository.AddToCart(cartItem);
            console.log("Added to cart:", result);
            alert("Sản phẩm đã được thêm vào giỏ hàng!");

        } catch (error) {
            console.error("Add to cart failed", error);
            alert("Có lỗi xảy ra khi thêm vào giỏ hàng.");
        } finally {
            // setLoading(false);
        }


    }

    return (
        <>
            {products.map((p) => {
                const currentStart = startIndexes[p.id] || 0;
                const mainImg = selectedImages[p.id] || p.mainImage;
                const totalImages = p.secondaryImage?.length || 0;
                return (
                    <div key={p.id} className="flex flex-col gap-2 bg-white p-2 rounded-md shadow-sm ">
                        {/* === ẢNH SẢN PHẨM === */}
                        <div className="flex flex-col items-center w-full">
                            <img
                                src={mainImg}
                                alt={p.name || "Product image"}
                                className="w-full max-w-[233px] h-[233px] object-cover rounded"
                            />

                            {/* thumbnail + mũi tên */}
                            <div className="flex items-center justify-center w-full mt-2">
                                <button
                                    onClick={() => handlePrev(p.id)}
                                    className="bg-gray-200 hover:bg-gray-300 p-1 rounded"
                                    disabled={currentStart === 0}
                                >
                                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                                </button>

                                {/* // render thumbnail */}
                                <div className="flex gap-1 mx-2 overflow-hidden">
                                    {p.secondaryImage
                                        ?.slice(currentStart, currentStart + visibleCount) // chỉ hiển thị 4 ảnh
                                        .map((img, idx) => (
                                            <img
                                                key={idx}
                                                src={img}
                                                onClick={() => handleSelectImage(p.id, img)}
                                                className="w-7 h-7 object-cover cursor-pointer hover:scale-105 transition rounded"
                                            />
                                        ))}
                                </div>

                                <button
                                    className="bg-gray-200 hover:bg-gray-300 p-1 rounded"
                                    onClick={() => handleNext(p.id, totalImages)}
                                    disabled={currentStart + visibleCount >= totalImages}
                                >
                                    <ArrowRight className="w-6 h-6 text-gray-600" />
                                </button>
                            </div>
                        </div>

                        {/* === THÔNG TIN SẢN PHẨM === */}
                        <div className="flex flex-col gap-2 text-center flex-grow justify-between">
                            <a href={`/productdetail/${p.id}`}>
                                <p className="text-base font-medium line-clamp-2 h-12 text-gray-700">{p.name}</p>
                            </a>
                            <p className="text-lg font-semibold text-red-500">${p.price}</p>

                            <div className="flex justify-center gap-4 items-center py-2">
                                <button
                                    onClick={() => handleAddToCart(p.id)}
                                    className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded">
                                    Cart
                                </button>
                                <button className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded">
                                    Buy
                                </button>
                            </div>
                        </div>
                        {/* === ĐÁNH GIÁ & ĐỊA ĐIỂM === */}
                        <div className="flex flex-row justify-between items-center mt-auto pt-2">
                            <div className="flex flex-row items-center gap-1">
                                <FaStar className="text-yellow-400" />
                                <FaStar className="text-yellow-400" />
                                <FaStar className="text-yellow-400" />
                                <FaStar className="text-yellow-400" />
                                <FaStarHalfAlt className="text-yellow-400" />
                            </div>
                            <p className="text-gray-400 text-sm">Hồ Chí Minh</p>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default SearchInfo;
