import React, { useEffect, useState } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import type { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
// import { filtersByCategory } from '../../../config/filtersConfig';
// import { useLocation, useNavigate } from 'react-router-dom';
interface Props {
    keyword: string | undefined;
    onFiltersChange?: (filters: any) => void;
}
const FilterInfo: React.FC<Props> = ({ keyword, onFiltersChange }) => {
    console.log(keyword)
    // const products = useSelector((state: RootState) => state.products.resultSearch);
    const ValuesAtributes = useSelector((state: RootState) => state.products.FilterProductsByAttributes);
    const [filtersState, setFiltersState] = useState({
        price: 28000, // giá slider mặc định
        selectedOptions: {} as Record<string, string[]>, // lưu các checkbox được tick
    });
    const [showAllStates, setShowAllStates] = useState<Record<string, boolean>>({});
    const toggleShowAll = (name: string) => {
        setShowAllStates(prev => ({
            ...prev,
            [name]: !prev[name]
        }));
    };
    console.log("checkbox: " + filtersState.selectedOptions);
    // lấy category từ product đầu tiên
    // const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setFiltersState(prev => ({
    //         ...prev, // giữ nguyên các state khác
    //         price: Number(e.target.value) // cập nhật giá trị mới
    //     }));
    // };
    const [priceRange, setPriceRange] = useState(28000);
    console.log(setPriceRange);
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setPriceRange(Number(e.target.value));
    // }
    const handleCheckboxChange = (title: string, option: string) => {
        setFiltersState(prev => {
            const prevOptions = prev.selectedOptions[title] || [];
            if (prevOptions.includes(option)) {
                // Bỏ tick
                return {
                    ...prev,
                    selectedOptions: {
                        ...prev.selectedOptions,
                        [title]: prevOptions.filter(o => o !== option)
                    }
                };
            } else {
                // Thêm tick
                return {
                    ...prev,
                    selectedOptions: {
                        ...prev.selectedOptions,
                        [title]: [...prevOptions, option]
                    }
                };
            }
        });
    };
    useEffect(() => {
        console.log("Các filter hiện tại:", filtersState.selectedOptions);
        if (onFiltersChange) {
            onFiltersChange(filtersState); // 🔹 Gửi toàn bộ state lên cha
        }
    }, [filtersState.selectedOptions]);
    return (
        <>
            <h4>Recently use filter</h4>
            <p>All Discount</p>
            <br />
            <div className='px-2 '>
                <hr />
            </div>
            <br />
            <p><b>Price</b></p>
            <p><b>$3 - ${priceRange.toLocaleString()}</b></p>
            {/* thanh slider */}
            <div className='flex flex-row justify-center items-center gap-2'>
                <input
                    type="range"
                    min={3}
                    max={28000}
                    value={filtersState.price}
                    onChange={(e) => setFiltersState(prev => ({ ...prev, price: Number(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg"
                />
                <button className='border rounded-full px-3'>Go</button>
            </div>
            <div className='py-1'>
                <p><a href="">Up to $45</a></p>
                <p><a href="">$45 to $90</a></p>
                <p><a href="">$90 to $150</a></p>
                <p><a href="">$150 to $200</a></p>
                <p><a href="">$200 to above</a></p>
            </div>
            <div className='py-2'>
                <p><b>Customer Reviews</b></p>
                <div className="flex flex-row">
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                    <FaStarHalfAlt className="text-yellow-500" />
                </div>
            </div>
            {Object.entries(
                ValuesAtributes.reduce((acc, item) => {
                    const key = item.attributeName;
                    if (!acc[key]) acc[key] = [];
                    if (!acc[key].includes(item.attributeValue)) {
                        acc[key].push(item.attributeValue);
                    }
                    return acc;
                }, {} as Record<string, string[]>)
            ).map(([name, values]) => {
                const showAll = showAllStates[name] || false;
                const displayedValues = showAll ? values : values.slice(0, 5);
                return (
                    <div key={name} className="py-2">
                        <p><b>{name}</b></p>

                        {displayedValues.map((val) => (
                            <div key={val}>
                                <input
                                    type="checkbox"
                                    checked={filtersState.selectedOptions[name]?.includes(val) || false}
                                    onChange={() => handleCheckboxChange(name, val)}
                                />
                                <label className="px-2">{val}</label>
                            </div>
                        ))}

                        {values.length > 5 && (
                            <button
                                className="text-blue-600 text-sm mt-1 hover:underline font-semibold"
                                onClick={() => toggleShowAll(name)}
                            >
                                {showAll ? "See less" : "See more"}
                            </button>
                        )}
                    </div>
                );
            })}
        </>
    );
};
export default FilterInfo;