import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface DealItemProps {
    image: string;
    title: string;
    type: string;
    price: number;
    id: number;
    onAddToCart: () => void; // 👈 thêm dòng này
}

const DealItem: React.FC<DealItemProps> = ({ image, title, type, price, id, onAddToCart }) => {
    const navigate = useNavigate();
    return (
        <div className='grid grid-cols-[120px_1fr] gap-2'>
            {/* Ảnh */}
            <div className='w-[120px] h-[160px] flex-shrink-0 overflow-hidden rounded-md'>
                <img src={image} alt={title} className="w-full h-full object-cover" />
            </div>

            {/* Nội dung */}
            <div className='flex flex-col gap-1 max-h-[160px] overflow-hidden'>
                <div className='overflow-x-auto lg:overflow-x-visible pr-1'
                    onClick={() => navigate(`/productdetail/${id}`)}  >
                    <h3 className='font-semibold whitespace-nowrap lg:whitespace-normal w-max lg:w-full'>{title}</h3>
                </div>
                <div className='flex flex-row'>
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <FaStarHalfAlt className="text-yellow-400" />
                </div>
                <div className='overflow-x-auto whitespace-nowrap'>
                    <p>{type}</p>
                </div>
                <p className='text-red-500'>${price.toFixed(2)}</p>
                <button onClick={onAddToCart} className='bg-amber-300 p-2 rounded-2xl md:w-[100px] shadow-md'>Add to Cart</button>
            </div>
        </div>
    );
};

export default DealItem;
