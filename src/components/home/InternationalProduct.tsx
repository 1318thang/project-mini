import React from 'react';
import type { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const InternationalProduct: React.FC = () => {
    const products = useSelector((state: RootState) => state.products.getProductImageRandom);
    const navigate = useNavigate();
    return (
        <div className="bg-[#D9D9D9] p-4">
            <div className="bg-white px-6 py-4 rounded-md">
                <h2 className="text-lg font-semibold mb-3">
                    International top sellers in Kitchen
                </h2>
                <div className="relative group">
                    <div
                        className="flex overflow-x-auto space-x-4 custom-scroll transition-all duration-300 pb-3">
                        {products.map((item, index) => (
                            <img
                                key={index}
                                src={item.mainImage}
                                onClick={() => navigate(`/productdetail/${item.id}`)} // ✅ chuyển trang
                                alt="Product"
                                className="w-40 h-40 object-cover rounded-md flex-shrink-0"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default InternationalProduct;